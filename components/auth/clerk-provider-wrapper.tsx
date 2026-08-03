import { ClerkProvider } from "@clerk/nextjs";

// A safe wrapper that always provides ClerkProvider so Clerk hooks
// (useAuth, SignInButton, UserButton) never error at build or runtime.
// If NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is set, Clerk works normally.
// If not set, Clerk still mounts but shows a config warning in dev only.
const DUMMY_KEY = "pk_test_Y2xlcmsjZGVtbzEyMzQ1Njc4OTA";

export function ClerkProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const publishableKey =
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || DUMMY_KEY;

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      afterSignOutUrl="/"
      signInUrl="/portal"
      signUpUrl="/portal"
    >
      {children}
    </ClerkProvider>
  );
}
