export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";
import { clerkEnabled } from "@/lib/clerk";
import { initDB, getClientByClerkId, getFirstClient, getLatestTelemetry } from "@/lib/db";

export async function GET(request: Request) {
  try {
    await initDB(); // idempotent

    let client = null;

    if (clerkEnabled()) {
      // Authenticate via Clerk
      const { userId } = await auth();
      if (!userId) {
        return Response.json(
          { error: "Unauthorized. Please sign in." },
          { status: 401 }
        );
      }

      // Try to find client linked to this Clerk user
      client = await getClientByClerkId(userId);

      // Fallback: return the first client (useful during onboarding)
      if (!client) {
        client = await getFirstClient();
      }
    } else {
      // Auth not configured — public access, return first client
      client = await getFirstClient();
    }

    if (!client) {
      return Response.json(
        { error: "No client linked. Seed your database first." },
        { status: 404 }
      );
    }

    const latest = await getLatestTelemetry(client.id);

    const health = latest ? JSON.parse(latest.health_json) : null;
    const costs = latest ? JSON.parse(latest.cost_summary_json) : null;

    return Response.json({
      client: {
        id: client.id,
        company_name: client.company_name,
        tailscale_url: client.tailscale_url,
      },
      telemetry: {
        last_seen: latest?.reported_at ?? null,
        online: health?.hermes_alive ?? false,
        uptime_str: health?.uptime_str ?? "unknown",
        version: health?.version ?? "unknown",
        total_cost: costs?.total_cost ?? 0,
        today_cost: costs?.today_cost ?? 0,
        total_sessions: costs?.total_sessions ?? 0,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
