import { Pool } from "pg";

// ── PostgreSQL client for Axos telemetry ─────────────────────────────────
// Railway injects DATABASE_URL automatically when you add a Postgres DB.
// Locally, set DATABASE_URL=postgresql://user:pass@localhost:5432/axos

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production" ||
    process.env.DATABASE_URL?.includes("railway.app")
      ? { rejectUnauthorized: false }
      : false,
});

export interface Client {
  id: string;
  company_name: string;
  brain_api_key: string;
  tailscale_url: string;
  created_at: string;
  admin_email?: string | null;
  clerk_user_id?: string | null;
}

export interface TelemetryRecord {
  id: string;
  client_id: string;
  health_json: string;
  cost_summary_json: string;
  created_at: string;
  reported_at: string;
}

export { pool };

/** Ensure tables exist. Call once at startup. */
export async function initDB(): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS clients (
        id TEXT PRIMARY KEY,
        company_name TEXT NOT NULL,
        brain_api_key TEXT NOT NULL UNIQUE,
        tailscale_url TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        admin_email TEXT,
        clerk_user_id TEXT
      );

      CREATE TABLE IF NOT EXISTS brain_telemetry (
        id TEXT PRIMARY KEY,
        client_id TEXT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
        health_json TEXT NOT NULL,
        cost_summary_json TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        reported_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_telemetry_client
        ON brain_telemetry(client_id, reported_at DESC);
    `);
  } finally {
    client.release();
  }
}

/** Find client by API key (used in telemetry auth). */
export async function getClientByApiKey(
  apiKey: string
): Promise<{ id: string } | null> {
  const result = await pool.query(
    `SELECT id FROM clients WHERE brain_api_key = $1`,
    [apiKey]
  );
  return result.rows[0] ?? null;
}

/** Insert a telemetry record. */
export async function insertTelemetry(
  record: TelemetryRecord
): Promise<void> {
  await pool.query(
    `INSERT INTO brain_telemetry (id, client_id, health_json, cost_summary_json, created_at, reported_at)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      record.id,
      record.client_id,
      record.health_json,
      record.cost_summary_json,
      record.created_at,
      record.reported_at,
    ]
  );

  // Keep only latest 500 records per client
  await pool.query(
    `DELETE FROM brain_telemetry
     WHERE id NOT IN (
       SELECT id FROM brain_telemetry
       WHERE client_id = $1
       ORDER BY reported_at DESC
       LIMIT 500
     )
     AND client_id = $1`,
    [record.client_id]
  );
}

/** Get client by Clerk user ID. */
export async function getClientByClerkId(
  clerkUserId: string
): Promise<Client | null> {
  const result = await pool.query<Client>(
    `SELECT * FROM clients WHERE clerk_user_id = $1`,
    [clerkUserId]
  );
  return result.rows[0] ?? null;
}

/** Get the first client (fallback when no Clerk match). */
export async function getFirstClient(): Promise<Client | null> {
  const result = await pool.query<Client>(
    `SELECT * FROM clients ORDER BY created_at ASC LIMIT 1`
  );
  return result.rows[0] ?? null;
}

/** Get latest telemetry for a client. */
export async function getLatestTelemetry(
  clientId: string
): Promise<TelemetryRecord | null> {
  const result = await pool.query<TelemetryRecord>(
    `SELECT * FROM brain_telemetry
     WHERE client_id = $1
     ORDER BY reported_at DESC
     LIMIT 1`,
    [clientId]
  );
  return result.rows[0] ?? null;
}
