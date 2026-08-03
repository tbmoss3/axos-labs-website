// ── Clerk configuration helper ─────────────────────────────────────────────
// Returns true when a real Clerk key is present (not the dummy build-time key).

export function clerkEnabled(): boolean {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";
  return (
    key.length > 0 &&
    key.startsWith("pk_") &&
    !key.includes("placeholder") &&
    !key.includes("cGxhY2Vob2xkZXI")
  );
}
