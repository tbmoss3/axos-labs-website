"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, SignInButton, UserButton } from "@/lib/auth-bridge";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { isLoaded, isSignedIn } = useAuth();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/portal", label: "Portal" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/80 backdrop-blur-2xl border-b border-black/[0.06]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-0 group"
          >
            <span className="font-serif text-xl md:text-2xl font-bold text-axos-text-primary tracking-tight">
              Axos
            </span>
            <span className="text-xl md:text-2xl font-light text-axos-accent tracking-tight">
              Labs
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-axos-text-secondary hover:text-axos-text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {isLoaded && (
              <>
                {isSignedIn ? (
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-8 h-8",
                      },
                    }}
                  />
                ) : (
                  <SignInButton mode="modal">
                    <button className="text-sm text-axos-text-secondary hover:text-axos-text-primary transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                )}
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-axos-text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-axos-border-subtle">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-base text-axos-text-secondary hover:text-axos-text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {isLoaded && (
              <div className="pt-2 border-t border-axos-border-subtle">
                {isSignedIn ? (
                  <div className="flex items-center gap-3 py-2">
                    <UserButton afterSignOutUrl="/" />
                    <span className="text-sm text-axos-text-secondary">Account</span>
                  </div>
                ) : (
                  <SignInButton mode="modal">
                    <button className="block w-full text-left py-2 text-base text-axos-text-secondary hover:text-axos-text-primary transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
