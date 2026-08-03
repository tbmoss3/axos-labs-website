import os
import psycopg2

# ── Seed the Axos PostgreSQL database ────────────────────────────────────
# Run this once after adding a Postgres DB on Railway (or local).
# It inserts one client. Edit the values below before running.

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    print("Error: DATABASE_URL is not set.")
    print("Set it to your Railway connection string, e.g.:")
    print('  export DATABASE_URL="postgresql://postgres:password@host:port/db"')
    sys.exit(1)

import sys

# ── CHANGE THESE ───────────────────────────────────────────────────────
COMPANY_NAME = "Simmons & Harris"          # Client company name
BRAIN_API_KEY = "axos_sk_test_xxxxxxxx"    # Strong secret — must match Brain .env
TAILSCALE_URL = "http://shbrain.tail6ba1cf.ts.net:8081"  # Brain console URL
ADMIN_EMAIL = "benton@axos.dev"            # Admin / primary contact
# ────────────────────────────────────────────────────────────────────────

conn = psycopg2.connect(DATABASE_URL, sslmode="require" if "railway.app" in DATABASE_URL else "prefer")
cur = conn.cursor()

cur.execute('''
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
''')

# Insert or replace client
cur.execute('''
    INSERT INTO clients (id, company_name, brain_api_key, tailscale_url, created_at, admin_email)
    VALUES (%s, %s, %s, %s, NOW(), %s)
    ON CONFLICT (brain_api_key) DO UPDATE SET
        company_name = EXCLUDED.company_name,
        tailscale_url = EXCLUDED.tailscale_url,
        admin_email = EXCLUDED.admin_email;
''', (
    f"client-{COMPANY_NAME.lower().replace(' ', '-').replace('&', '')}",
    COMPANY_NAME,
    BRAIN_API_KEY,
    TAILSCALE_URL,
    ADMIN_EMAIL,
))

conn.commit()

# Verify
cur.execute("SELECT id, company_name, brain_api_key FROM clients LIMIT 1")
row = cur.fetchone()
print(f"Seeded client: {row[1]} ({row[0]})")
print(f"API key hash prefix: {row[2][:8]}...")

cur.close()
conn.close()
print("Done.")
