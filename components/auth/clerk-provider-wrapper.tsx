"use client";

import dynamic from "next/dynamic";
import React from "react";

// Lazy-load ClerkProvider on client only — prevents SSR crashes when keys missing
const ClerkProviderClient = dynamic(
  () =>
    import("@clerk/nextjs").then((m) => {
      const RealProvider = m.ClerkProvider;
      return function WrappedProvider({
        children,
        publishableKey,
      }: {
        children: React.ReactNode;
        publishableKey: string;
      }) {
        return (
          <RealProvider publishableKey={publishableKey}>
            {children}
          </RealProvider>
        );
      };
    }).catch(() => {
      // No-op if Clerk fails to load (missing keys)
      return function NoOpProvider({ children }: { children: React.ReactNode }) {
        return <>{children}</>;
      };
    }),
  { ssr: false }
);

export default function ClerkProviderWrapper({
  children,
  publishableKey,
}: {
  children: React.ReactNode;
  publishableKey: string;
}) {
  return (
    <ClerkProviderClient publishableKey={publishableKey}>
      {children}
    </ClerkProviderClient>
  );
}
