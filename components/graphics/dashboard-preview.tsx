"use client";

export function DashboardPreview() {
  return (
    <div className="w-full max-w-2xl mx-auto select-none">
      <div className="rounded-lg border border-black/[0.08] bg-white overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-black/[0.06]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-[11px] text-axos-text-muted font-medium">Axos Brain Dashboard</span>
          </div>
          <div className="w-12" />
        </div>

        {/* Dashboard content */}
        <div className="p-5 space-y-4">
          {/* Top stats row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded border border-black/[0.06]">
              <p className="text-[10px] uppercase tracking-wider text-axos-text-muted mb-1">Tasks Today</p>
              <p className="text-lg font-semibold text-axos-text-primary">47</p>
            </div>
            <div className="p-3 rounded border border-black/[0.06]">
              <p className="text-[10px] uppercase tracking-wider text-axos-text-muted mb-1">Resolved</p>
              <p className="text-lg font-semibold text-green-600">43</p>
            </div>
            <div className="p-3 rounded border border-black/[0.06]">
              <p className="text-[10px] uppercase tracking-wider text-axos-text-muted mb-1">Escalated</p>
              <p className="text-lg font-semibold text-axos-accent">2</p>
            </div>
          </div>

          {/* Activity feed */}
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-wider text-axos-text-muted">Recent Activity</p>
            {[
              { time: "2m ago", action: "Filed eviction paperwork — Unit 4B", system: "RentManager" },
              { time: "12m ago", action: "Dispatched plumber — Water heater", system: "Vendor" },
              { time: "34m ago", action: "Generated invoice — $1,240.00", system: "QBO" },
              { time: "1h ago", action: "Screened tenant application — Approved", system: "CRM" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-2 px-3 rounded border border-black/[0.04] hover:border-black/[0.08] transition-colors"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                <span className="text-[10px] text-axos-text-muted w-10 flex-shrink-0">{item.time}</span>
                <span className="text-xs text-axos-text-primary flex-1 min-w-0 truncate">{item.action}</span>
                <span className="text-[10px] text-axos-text-muted bg-black/[0.03] px-1.5 py-0.5 rounded">{item.system}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
