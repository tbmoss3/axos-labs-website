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

      CREATE TABLE IF NOT EXISTS brain_intakes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        submitted_at TIMESTAMPTZ DEFAULT NOW(),
        company_name TEXT NOT NULL,
        industry TEXT NOT NULL,
        industry_other TEXT,
        company_description TEXT NOT NULL,
        company_size_band TEXT NOT NULL,
        years_in_business TEXT,
        business_model TEXT,
        unique_value_prop TEXT,
        employee_count INTEGER,
        pct_salaried INTEGER CHECK (pct_salaried BETWEEN 0 AND 100),
        pct_office INTEGER CHECK (pct_office BETWEEN 0 AND 100),
        tech_literacy_leadership INTEGER CHECK (tech_literacy_leadership BETWEEN 1 AND 5),
        tech_literacy_operations INTEGER CHECK (tech_literacy_operations BETWEEN 1 AND 5),
        tech_literacy_field INTEGER CHECK (tech_literacy_field BETWEEN 1 AND 5),
        it_staff TEXT,
        people_pain_point TEXT,
        critical_functions TEXT[],
        workflows_json JSONB NOT NULL DEFAULT '[]',
        bottleneck_description TEXT,
        decision_speed TEXT,
        process_management TEXT,
        software_json JSONB NOT NULL DEFAULT '[]',
        custom_software_json JSONB NOT NULL DEFAULT '[]',
        data_types_handled TEXT,
        integration_needs TEXT,
        software_satisfaction INTEGER,
        software_wishlist TEXT,
        infra_preference TEXT NOT NULL,
        current_ai_usage TEXT[],
        ai_successes TEXT,
        ai_failures TEXT,
        compliance_reqs TEXT[],
        contact_name TEXT NOT NULL,
        contact_role TEXT NOT NULL,
        contact_email TEXT NOT NULL,
        contact_phone TEXT,
        preferred_contact TEXT,
        urgency TEXT,
        referral_source TEXT,
        referral_other TEXT,
        tech_frustration TEXT,
        freeform_notes TEXT,
        consent_given BOOLEAN NOT NULL DEFAULT FALSE,
        discord_thread_id TEXT,
        status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'spec_drafted', 'approved', 'archived')),
        estimated_tier TEXT
      );

      CREATE INDEX IF NOT EXISTS idx_brain_intakes_status
        ON brain_intakes(status, submitted_at DESC);
      CREATE INDEX IF NOT EXISTS idx_brain_intakes_email
        ON brain_intakes(contact_email);

      CREATE TABLE IF NOT EXISTS software_suggestions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL UNIQUE,
        category TEXT,
        suggested_by_intake UUID REFERENCES brain_intakes(id) ON DELETE SET NULL,
        count INTEGER DEFAULT 1,
        added_to_curated BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
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

// ── Brain Architecture Intake (types + helpers) ────────────────────────────

export interface BrainIntake {
  id: string;
  submitted_at: string;
  company_name: string;
  industry: string;
  industry_other: string | null;
  company_description: string;
  company_size_band: string;
  years_in_business: string | null;
  business_model: string | null;
  unique_value_prop: string | null;
  employee_count: number | null;
  pct_salaried: number | null;
  pct_office: number | null;
  tech_literacy_leadership: number | null;
  tech_literacy_operations: number | null;
  tech_literacy_field: number | null;
  it_staff: string | null;
  people_pain_point: string | null;
  critical_functions: string[] | null;
  workflows_json: unknown;
  bottleneck_description: string | null;
  decision_speed: string | null;
  process_management: string | null;
  software_json: unknown;
  custom_software_json: unknown;
  data_types_handled: string | null;
  integration_needs: string | null;
  software_satisfaction: number | null;
  software_wishlist: string | null;
  infra_preference: string;
  current_ai_usage: string[] | null;
  ai_successes: string | null;
  ai_failures: string | null;
  compliance_reqs: string[] | null;
  contact_name: string;
  contact_role: string;
  contact_email: string;
  contact_phone: string | null;
  preferred_contact: string | null;
  urgency: string | null;
  referral_source: string | null;
  referral_other: string | null;
  tech_frustration: string | null;
  freeform_notes: string | null;
  consent_given: boolean;
  discord_thread_id: string | null;
  status: string;
  estimated_tier: string | null;
}

export interface SoftwareSuggestion {
  id: string;
  name: string;
  category: string | null;
  suggested_by_intake: string | null;
  count: number;
  added_to_curated: boolean;
  created_at: string;
}

/** Extended init for brain intake tables. */
export async function initBrainIntakeTables(): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS brain_intakes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        submitted_at TIMESTAMPTZ DEFAULT NOW(),

        company_name TEXT NOT NULL,
        industry TEXT NOT NULL,
        industry_other TEXT,
        company_description TEXT NOT NULL,
        company_size_band TEXT NOT NULL,
        years_in_business TEXT,
        business_model TEXT,
        unique_value_prop TEXT,

        employee_count INTEGER,
        pct_salaried INTEGER CHECK (pct_salaried BETWEEN 0 AND 100),
        pct_office INTEGER CHECK (pct_office BETWEEN 0 AND 100),
        tech_literacy_leadership INTEGER CHECK (tech_literacy_leadership BETWEEN 1 AND 5),
        tech_literacy_operations INTEGER CHECK (tech_literacy_operations BETWEEN 1 AND 5),
        tech_literacy_field INTEGER CHECK (tech_literacy_field BETWEEN 1 AND 5),
        it_staff TEXT,
        people_pain_point TEXT,

        critical_functions TEXT[],
        workflows_json JSONB NOT NULL DEFAULT '[]',
        bottleneck_description TEXT,
        decision_speed TEXT,
        process_management TEXT,

        software_json JSONB NOT NULL DEFAULT '[]',
        custom_software_json JSONB NOT NULL DEFAULT '[]',
        data_types_handled TEXT,
        integration_needs TEXT,
        software_satisfaction INTEGER,
        software_wishlist TEXT,
        infra_preference TEXT NOT NULL,

        current_ai_usage TEXT[],
        ai_successes TEXT,
        ai_failures TEXT,
        compliance_reqs TEXT[],

        contact_name TEXT NOT NULL,
        contact_role TEXT NOT NULL,
        contact_email TEXT NOT NULL,
        contact_phone TEXT,
        preferred_contact TEXT,
        urgency TEXT,
        referral_source TEXT,
        referral_other TEXT,
        tech_frustration TEXT,
        freeform_notes TEXT,
        consent_given BOOLEAN NOT NULL DEFAULT FALSE,

        discord_thread_id TEXT,
        status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'spec_drafted', 'approved', 'archived')),
        estimated_tier TEXT
      );

      CREATE INDEX IF NOT EXISTS idx_brain_intakes_status
        ON brain_intakes(status, submitted_at DESC);
      CREATE INDEX IF NOT EXISTS idx_brain_intakes_email
        ON brain_intakes(contact_email);

      CREATE TABLE IF NOT EXISTS software_suggestions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL UNIQUE,
        category TEXT,
        suggested_by_intake UUID REFERENCES brain_intakes(id) ON DELETE SET NULL,
        count INTEGER DEFAULT 1,
        added_to_curated BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
  } finally {
    client.release();
  }
}

/** Insert a brain intake record. */
export async function insertBrainIntake(
  data: Omit<BrainIntake, "id" | "submitted_at">
): Promise<string> {
  const fields = Object.keys(data).join(", ");
  const values = Object.values(data);
  const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");

  const result = await pool.query<{ id: string }>(
    `INSERT INTO brain_intakes (${fields})
     VALUES (${placeholders})
     RETURNING id`,
    values
  );
  return result.rows[0].id;
}

/** Upsert a software suggestion (increment count if exists). */
export async function upsertSoftwareSuggestion(
  name: string,
  category?: string,
  intakeId?: string
): Promise<void> {
  await pool.query(
    `INSERT INTO software_suggestions (name, category, suggested_by_intake)
     VALUES ($1, $2, $3)
     ON CONFLICT (name) DO UPDATE
     SET count = software_suggestions.count + 1`,
    [name, category ?? null, intakeId ?? null]
  );
}
