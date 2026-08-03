"use client";

// ── Clerk-safe auth wrappers ──────────────────────────────────────────────
// These exports work whether ClerkProvider is present or not.
// When Clerk keys are missing, isSignedIn is always false, isLoaded is true,
// and SignInButton/UserButton render nothing.

import React, { createContext, useContext } from "react";

const clerkConfigured = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

interface AuthCtx {
  isLoaded: boolean;
  isSignedIn: boolean;
  userId: string | null;
}

const SafeAuthContext = createContext<AuthCtx>({
  isLoaded: true,
  isSignedIn: false,
  userId: null,
});

// Only import Clerk hooks if configured
let ClerkAuth:
  | {
      useAuth: () => {
        isLoaded: boolean;
        isSignedIn: boolean;
        userId: string | null;
      };
      SignInButton: React.ComponentType<{ mode?: string; children: React.ReactNode }>;
      SignUpButton: React.ComponentType<{ mode?: string; children: React.ReactNode }>;
      UserButton: React.ComponentType<{ afterSignOutUrl?: string }>;
    }
  | undefined;

try {
  if (clerkConfigured) {
    const clerk = require("@clerk/nextjs");
    ClerkAuth = clerk;
  }
} catch {
  // Clerk not installed — fall back
}

export function useSafeAuth(): AuthCtx {
  if (ClerkAuth) {
    const clerkAuth = ClerkAuth!.useAuth();
    return {
      isLoaded: clerkAuth.isLoaded,
      isSignedIn: clerkAuth.isSignedIn ?? false,
      userId: clerkAuth.userId ?? null,
    };
  }
  return { isLoaded: true, isSignedIn: false, userId: null };
}

export function SignInButtonSafe({
  mode,
  children,
}: {
  mode?: string;
  children: React.ReactNode;
}) {
  if (!ClerkAuth) return null;
  const Button = ClerkAuth.SignInButton;
  return <Button mode={mode as any}>{children}</Button>;
}

export function SignUpButtonSafe({
  mode,
  children,
}: {
  mode?: string;
  children: React.ReactNode;
}) {
  if (!ClerkAuth) return null;
  const Button = ClerkAuth.SignUpButton;
  return <Button mode={mode as any}>{children}</Button>;
}

export function UserButtonSafe({ afterSignOutUrl }: { afterSignOutUrl?: string }) {
  if (!ClerkAuth) return null;
  const Button = ClerkAuth.UserButton;
  return <Button afterSignOutUrl={afterSignOutUrl} />;
}
