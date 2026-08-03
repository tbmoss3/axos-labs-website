"use client";

import dynamic from "next/dynamic";

// Force portal to render only on client — prevents Clerk SSR crashes
const PortalClient = dynamic(
  () => import("./page-client"),
  { ssr: false, loading: () => (
    <div className="min-h-screen bg-axos-bg pt-24 pb-20 px-4">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 rounded-xl bg-white border border-axos-border-subtle animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )}
);

export default function PortalPage() {
  return <PortalClient />;
}
