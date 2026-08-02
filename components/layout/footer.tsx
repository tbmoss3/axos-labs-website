"use client";

import Link from "next/link";
import { MessageSquare } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-axos-border-subtle bg-axos-bg">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-0 group">
              <span className="font-serif text-xl font-bold text-axos-text-primary tracking-tight group-hover:-tracking-tight transition-all duration-300">
                Axos
              </span>
              <span className="text-xl font-light text-axos-accent tracking-tight">
                Labs
              </span>
            </Link>
            <p className="text-sm text-axos-text-muted leading-relaxed max-w-xs">
              Persistent AI Brains for Business
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-axos-text-primary uppercase tracking-wider">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-sm text-axos-text-secondary hover:text-axos-text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-sm text-axos-text-secondary hover:text-axos-text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm text-axos-text-secondary hover:text-axos-text-primary transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-axos-text-primary uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="p-2.5 rounded-xl bg-black/[0.03] border border-black/[0.08] text-axos-text-secondary hover:text-axos-accent hover:border-axos-accent/30 hover:bg-axos-accent/5 transition-all duration-300"
                aria-label="Discord"
              >
                <MessageSquare size={18} />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-xl bg-black/[0.03] border border-black/[0.08] text-axos-text-secondary hover:text-axos-accent hover:border-axos-accent/30 hover:bg-axos-accent/5 transition-all duration-300"
                aria-label="GitHub"
              >
                <GitHubIcon size={18} />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-xl bg-black/[0.03] border border-black/[0.08] text-axos-text-secondary hover:text-axos-accent hover:border-axos-accent/30 hover:bg-axos-accent/5 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <LinkedInIcon size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-axos-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-axos-text-muted">
            &copy; 2026 Axos Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
