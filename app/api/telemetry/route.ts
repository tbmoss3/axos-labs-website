export const dynamic = "force-dynamic";

import {
  pool,
  initDB,
  getClientByApiKey,
  insertTelemetry,
} from "@/lib/db";

export async function POST(request: Request) {
  try {
    await initDB(); // idempotent — safe to call every time

    const apiKey =
      request.headers.get("x-api-key") ||
      request.headers.get("X-API-Key") ||
      request.headers.get("X-API-KEY") ||
      "";

    if (!apiKey) {
      return Response.json({ error: "Missing X-API-Key header" }, { status: 401 });
    }

    const client = await getClientByApiKey(apiKey);
    if (!client) {
      return Response.json({ error: "Invalid API key" }, { status: 401 });
    }

    const payload = await request.json().catch(() => ({}));
    const now = new Date().toISOString();

    await insertTelemetry({
      id: `tel-${Date.now()}`,
      client_id: client.id,
      health_json: JSON.stringify(payload),
      cost_summary_json: JSON.stringify({
        total_cost: payload.total_cost ?? 0,
        today_cost: payload.today_cost ?? 0,
        total_sessions: payload.total_sessions ?? 0,
      }),
      created_at: now,
      reported_at: payload.reported_at || now,
    });

    return Response.json({ success: true, received_at: now });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
