import React, { Suspense } from "react";

// Server component shell — renders client-only portal UI via Suspense
export const metadata = {
  title: "Client Portal — Axos Labs",
  description: "View your Brain health, usage, and costs.",
};

// Loading fallback for the client component
function PortalLoading() {
  return (
    <div className="min-h-screen bg-axos-bg pt-24 pb-20 px-4">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-32 rounded-xl bg-white border border-axos-border-subtle animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Client-only portal UI (lazy-loaded to avoid SSR Clerk crashes)
const PortalClient = React.lazy(() => import("./page-client"));

export default function PortalPage() {
  return (
    <Suspense fallback={<PortalLoading />}>
      <PortalClient />
    </Suspense>
  );
}
