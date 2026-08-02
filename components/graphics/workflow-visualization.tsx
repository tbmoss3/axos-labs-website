"use client";

const flowSteps = [
  { label: "Work Order Received", status: "done" },
  { label: "Brain Reads Context", status: "done" },
  { label: "Matches to Vendor", status: "active" },
  { label: "Dispatches & Logs", status: "pending" },
  { label: "Updates QBO", status: "pending" },
];

export function WorkflowVisualization() {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-0">
        {flowSteps.map((step, i) => (
          <div key={i} className="flex items-center gap-4">
            {/* Status indicator */}
            <div className="flex flex-col items-center">
              <div
                className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                  step.status === "done"
                    ? "bg-green-500"
                    : step.status === "active"
                    ? "bg-axos-accent animate-pulse"
                    : "bg-black/10"
                }`}
              />
              {i < flowSteps.length - 1 && (
                <div className="w-px h-6 bg-black/[0.08]" />
              )}
            </div>

            {/* Label */}
            <div className="py-2">
              <span
                className={`text-sm ${
                  step.status === "pending"
                    ? "text-axos-text-muted"
                    : "text-axos-text-primary"
                }`}
              >
                {step.label}
              </span>
              {step.status === "active" && (
                <span className="ml-2 text-[10px] uppercase tracking-wider text-axos-accent bg-axos-accent/5 px-1.5 py-0.5 rounded">
                  Active
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
