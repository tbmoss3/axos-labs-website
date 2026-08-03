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
