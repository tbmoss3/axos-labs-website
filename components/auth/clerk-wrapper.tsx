"use client";

import React from "react";
import { ClerkProvider as RealClerkProvider } from "@clerk/nextjs";

// ── Safe ClerkProvider ────────────────────────────────────────────────────
// Only renders the real ClerkProvider when a publishable key is present.
// Otherwise it renders children directly so the site works without auth.
// This avoids prerender errors during build when env vars are missing.

const hasKey = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export function ClerkProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!hasKey) {
    return <>{children}</>;
  }
  return <RealClerkProvider>{children}</RealClerkProvider>;
}
