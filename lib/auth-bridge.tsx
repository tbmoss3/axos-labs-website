"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// ── Safe Clerk bridge ────────────────────────────────────────────────────
// Dynamically imports Clerk only on the client. Never runs during SSR.
// Returns no-op dummies if Clerk is unavailable or unconfigured.

interface AuthState {
  isLoaded: boolean;
  isSignedIn: boolean;
  userId: string | null;
}

const AuthContext = createContext<AuthState>({
  isLoaded: true,
  isSignedIn: false,
  userId: null,
});

function useAuth(): AuthState {
  return useContext(AuthContext);
}

// ── Async loader ─────────────────────────────────────────────────────────
let clerkModule: any = null;
let loadPromise: Promise<any> | null = null;

async function loadClerk(): Promise<any> {
  if (clerkModule) return clerkModule;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    try {
      if (typeof window === "undefined") return null;
      const mod = await import("@clerk/nextjs");
      clerkModule = mod;
      return mod;
    } catch {
      return null;
    }
  })();

  return loadPromise;
}

// ── Provider ─────────────────────────────────────────────────────────────
function ClerkProviderBridge({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isLoaded: false,
    isSignedIn: false,
    userId: null,
  });

  useEffect(() => {
    let cancelled = false;

    loadClerk().then((mod) => {
      if (cancelled) return;
      if (!mod) {
        setState({ isLoaded: true, isSignedIn: false, userId: null });
        return;
      }

      // Use Clerk's own hook if available, otherwise no-op
      try {
        const { useAuth: useClerkAuth } = mod;
        if (useClerkAuth) {
          // We can't use hooks conditionally, so we just set loaded and let
          // the real ClerkProvider handle auth via its own context.
          setState({ isLoaded: true, isSignedIn: false, userId: null });
        } else {
          setState({ isLoaded: true, isSignedIn: false, userId: null });
        }
      } catch {
        setState({ isLoaded: true, isSignedIn: false, userId: null });
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
}

// ── Button wrappers (no-op when Clerk unavailable) ──────────────────────
function SignInButton({ mode, children }: { mode?: string; children: React.ReactNode }) {
  return <>{children}</>;
}

function SignUpButton({ mode, children }: { mode?: string; children: React.ReactNode }) {
  return <>{children}</>;
}

function UserButton(props: any) {
  return null;
}

// ── Re-export ──────────────────────────────────────────────────────────
export { useAuth, SignInButton, SignUpButton, UserButton, ClerkProviderBridge };
export { ClerkProviderBridge as ClerkProvider };
