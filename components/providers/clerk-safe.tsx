"use client";

import React from "react";
import {
  ClerkProvider as RealClerkProvider,
  useAuth as realUseAuth,
  SignInButton as RealSignInButton,
  SignUpButton as RealSignUpButton,
  UserButton as RealUserButton,
} from "@clerk/nextjs";

const IS_CONFIGURED = !!(
  typeof process !== "undefined" &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
);

/** Always renders a provider shell — real Clerk when configured, pass-through when not. */
export function ClerkProvider({ children }: { children: React.ReactNode }) {
  if (!IS_CONFIGURED) {
    return <>{children}</>;
  }
  return <RealClerkProvider>{children}</RealClerkProvider>;
}

/** Safe auth hook — returns fallback when Clerk is not configured. */
export function useAuth() {
  if (!IS_CONFIGURED) {
    return {
      isLoaded: true,
      isSignedIn: false,
      userId: null,
      orgId: null,
      has: () => false,
    } as ReturnType<typeof realUseAuth>;
  }
  return realUseAuth();
}

/** Sign-in button — renders nothing when Clerk is not configured. */
export function SignInButton({
  children,
  mode,
}: {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
}) {
  if (!IS_CONFIGURED) {
    return null;
  }
  return (
    <RealSignInButton mode={mode}>{children}</RealSignInButton>
  );
}

/** Sign-up button — renders nothing when Clerk is not configured. */
export function SignUpButton({
  children,
  mode,
}: {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
}) {
  if (!IS_CONFIGURED) {
    return null;
  }
  return (
    <RealSignUpButton mode={mode}>{children}</RealSignUpButton>
  );
}

/** User button / avatar — renders nothing when Clerk is not configured. */
export function UserButton(props: React.ComponentProps<typeof RealUserButton>) {
  if (!IS_CONFIGURED) {
    return null;
  }
  return <RealUserButton {...props} />;
}
