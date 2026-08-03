"use client";

import React, { useState, useEffect } from "react";
import { useAuth, SignInButton, SignUpButton, UserButton } from "@/lib/auth-bridge";
import {
  Activity,
  DollarSign,
  Server,
  Clock,
  ExternalLink,
  Zap,
  AlertTriangle,
  LogIn,
  UserPlus,
} from "lucide-react";

interface PortalData {
  client?: {
    id: string;
    company_name: string;
    tailscale_url: string;
  };
  telemetry?: {
    last_seen: string | null;
    online: boolean;
    uptime_str: string;
    version: string;
    total_cost: number;
    today_cost: number;
    total_sessions: number;
  };
  error?: string;
}

export default function PortalClient() {
  const { isLoaded, isSignedIn } = useAuth();
  const [data, setData] = useState<PortalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    fetchData();
  }, [isLoaded, isSignedIn]);

  async function fetchData() {
    try {
      setLoading(true);
      const res = await fetch("/api/portal/data", { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Failed to load portal data");
        return;
      }
      setData(json);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setLoading(false);
    }
  }

  // Show auth prompt when not signed in
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-axos-bg pt-24 pb-20 px-4">
        <div className="max-w-[1280px] mx-auto">
          <div className="max-w-xl mx-auto text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-axos-accent/10 flex items-center justify-center mx-auto mb-6">
              <LogIn className="w-8 h-8 text-axos-accent" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-axos-text-primary mb-3">
              Client Portal
            </h1>
            <p className="text-axos-text-secondary mb-8">
              Sign in to view your Brain health, usage, and costs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <SignInButton mode="modal">
                <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-axos-accent text-white text-sm font-medium hover:bg-axos-accent-hover transition-colors">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-axos-border-standard text-axos-text-primary text-sm font-medium hover:bg-axos-bg-surface transition-colors">
                  <UserPlus className="w-4 h-4" />
                  Create Account
                </button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const t = data?.telemetry;
  const client = data?.client;
  const isOnline = t?.online ?? false;
  const lastSeen = t?.last_seen
    ? new Date(t.last_seen).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Never";

  return (
    <div className="min-h-screen bg-axos-bg pt-24 pb-20 px-4">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-axos-accent" />
              <span className="text-sm font-medium text-axos-accent tracking-wide uppercase">
                Client Portal
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-axos-text-primary mb-2">
              {client?.company_name ?? "Your Brain"}
            </h1>
            <p className="text-axos-text-secondary max-w-xl">
              Overview of your Axos Brain health, usage, and costs.
            </p>
          </div>
          <div className="shrink-0">
            <UserButton afterSignOutUrl="/portal" />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">Error loading portal data</p>
              <p className="opacity-80">{error}</p>
              <button
                onClick={fetchData}
                className="mt-2 text-xs font-medium underline underline-offset-2 hover:no-underline"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-32 rounded-xl bg-white border border-axos-border-subtle animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Stats */}
        {!loading && t && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <StatCard
              icon={<Activity className="w-5 h-5" />}
              label="Brain Status"
              value={isOnline ? "Online" : "Offline"}
              color={isOnline ? "text-axos-success" : "text-red-500"}
              sub={isOnline ? `Uptime: ${t.uptime_str}` : "Last seen: " + lastSeen}
            />
            <StatCard
              icon={<DollarSign className="w-5 h-5" />}
              label="Total Cost"
              value={`$${(t.total_cost ?? 0).toFixed(2)}`}
              sub={`Today: $${(t.today_cost ?? 0).toFixed(2)}`}
            />
            <StatCard
              icon={<Server className="w-5 h-5" />}
              label="Sessions"
              value={(t.total_sessions ?? 0).toLocaleString()}
              sub={`Version ${t.version ?? "unknown"}`}
            />
            <StatCard
              icon={<Clock className="w-5 h-5" />}
              label="Last Update"
              value={lastSeen}
              sub="From telemetry reporter"
            />
          </div>
        )}

        {/* Actions */}
        {!loading && client && (
          <div className="bg-axos-bg-surface border border-axos-border-subtle rounded-2xl p-8 mb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-axos-text-primary mb-1">
                  Full Console
                </h2>
                <p className="text-sm text-axos-text-secondary max-w-lg">
                  Access your real-time Brain dashboard with full session history, audit logs, and autonomy controls.
                </p>
              </div>
              <a
                href={client.tailscale_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-axos-accent text-white text-sm font-medium hover:bg-axos-accent-hover transition-colors shrink-0"
              >
                Open Full Console
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-axos-text-muted mt-4">
              Requires Tailscale VPN and your local Brain to be running.
            </p>
          </div>
        )}

        {/* Empty / unlinked state */}
        {!loading && !t && !error && (
          <div className="bg-axos-bg-surface border border-axos-border-subtle rounded-2xl p-10 text-center max-w-2xl mx-auto">
            <Zap className="w-12 h-12 text-axos-accent mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-axos-text-primary mb-2">
              Brain Not Linked
            </h2>
            <p className="text-axos-text-secondary mb-6">
              Your account is signed in but no Brain telemetry has been received yet. Ensure the reporter script is running on your Brain machine.
            </p>
            <div className="text-sm text-axos-text-muted bg-axos-bg p-4 rounded-lg border border-axos-border-subtle text-left max-w-lg mx-auto">
              <p className="font-medium text-axos-text-primary mb-1">Quick start:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  On your Brain machine, run{" "}
                  <code className="text-xs bg-axos-bg-elevated px-1 py-0.5 rounded">
                    python reporter.py
                  </code>
                </li>
                <li>
                  Ensure{" "}
                  <code className="text-xs bg-axos-bg-elevated px-1 py-0.5 rounded">
                    AXOS_TELEMETRY_URL=https://axos.up.railway.app/api/telemetry
                  </code>{" "}
                  is set.
                </li>
                <li>
                  Ensure{" "}
                  <code className="text-xs bg-axos-bg-elevated px-1 py-0.5 rounded">
                    AXOS_CONSOLE_API_KEY
                  </code>{" "}
                  matches your Brain.
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* Footer hint */}
        <p className="text-center text-xs text-axos-text-muted mt-12">
          Telemetry refreshes automatically when your Brain pushes updates.
        </p>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color = "text-axos-text-primary",
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color?: string;
  sub?: string;
}) {
  return (
    <div className="bg-axos-bg-surface border border-axos-border-subtle rounded-xl p-6 transition-all hover:border-axos-border-standard">
      <div className="flex items-center gap-2 mb-3">
        <div className="text-axos-accent">{icon}</div>
        <span className="text-xs font-medium text-axos-text-muted uppercase tracking-wide">
          {label}
        </span>
      </div>
      <div className={`font-serif text-2xl font-bold ${color} mb-1`}>{value}</div>
      {sub && <p className="text-sm text-axos-text-secondary">{sub}</p>}
    </div>
  );
}
