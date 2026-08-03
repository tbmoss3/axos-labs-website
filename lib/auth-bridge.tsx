"use client";

import React from "react";

// ── Safe Clerk bridge ────────────────────────────────────────────────────
// Provides dummy exports when Clerk is not configured (local builds).
// When a real Clerk key is present on Railway, these are actual hooks/components.

const dummyHook = () => ({ isLoaded: true, isSignedIn: false, userId: null });
const dummyButton = ({ children }: any) => children;

let useAuth: any;
let SignInButton: any;
let SignUpButton: any;
let UserButton: any;
let SignedIn: any;
let SignedOut: any;

try {
  const clerk = require("@clerk/nextjs");

  useAuth = clerk.useAuth || dummyHook;
  SignInButton = clerk.SignInButton || dummyButton;
  SignUpButton = clerk.SignUpButton || dummyButton;
  UserButton = clerk.UserButton || (() => null);
  SignedIn = clerk.SignedIn || React.Fragment;
  SignedOut = clerk.SignedOut || React.Fragment;
} catch {
  useAuth = dummyHook;
  SignInButton = dummyButton;
  SignUpButton = dummyButton;
  UserButton = () => null;
  SignedIn = React.Fragment;
  SignedOut = React.Fragment;
}

export { useAuth, SignInButton, SignUpButton, UserButton, SignedIn, SignedOut };
