"use client";

import React, { useState, useEffect } from "react";

export default function ClerkProviderWrapper({
  children,
  publishableKey,
}: {
  children: React.ReactNode;
  publishableKey: string;
}) {
  // Placeholder or missing key → skip Clerk entirely (local dev / no auth)
  const isPlaceholder =
    !publishableKey ||
    publishableKey === "pk_test_cGxhY2Vob2xkZXI" ||
    publishableKey === "pk_test_placeholder";

  if (isPlaceholder) {
    return <>{children}</>;
  }

  const [ClerkProvider, setClerkProvider] =
    useState<React.FC<{ publishableKey: string; children: React.ReactNode }> | null>(null);

  useEffect(() => {
    let cancelled = false;

    import("@clerk/nextjs")
      .then((mod) => {
        if (!cancelled) setClerkProvider(() => mod.ClerkProvider);
      })
      .catch(() => {
        // Failed to load Clerk → silently skip
      });

    return () => { cancelled = true; };
  }, []);

  if (!ClerkProvider) {
    return <>{children}</>;
  }

  return <ClerkProvider publishableKey={publishableKey}>{children}</ClerkProvider>;
}
