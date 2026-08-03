import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { clerkEnabled } from "@/lib/clerk";

// Lazy-load Clerk middleware to avoid crashing when keys are missing
let _clerkMiddleware: any = null;
let _createRouteMatcher: any = null;

async function getClerkMiddleware() {
  if (!_clerkMiddleware) {
    const clerk = await import("@clerk/nextjs/server");
    _clerkMiddleware = clerk.clerkMiddleware;
    _createRouteMatcher = clerk.createRouteMatcher;
  }
  return { clerkMiddleware: _clerkMiddleware, createRouteMatcher: _createRouteMatcher };
}

export default async function middleware(req: NextRequest) {
  if (!clerkEnabled()) {
    // Auth not configured — allow all routes
    return NextResponse.next();
  }

  const { clerkMiddleware, createRouteMatcher } = await getClerkMiddleware();
  const isProtectedRoute = createRouteMatcher(["/portal"]);

  const handler = clerkMiddleware(async (auth: any) => {
    if (isProtectedRoute(req)) {
      await auth.protect();
    }
  });

  return handler(req);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
