"use client";

import Link from "next/link";
import { AnimatedSection } from "@/components/animations/animated-section";
import { RevealHeading } from "@/components/animations/reveal-heading";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-24 md:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle ambient glow behind the CTA */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124, 58, 237, 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto">
        <AnimatedSection className="text-center max-w-3xl mx-auto">
          <RevealHeading
            text="Ready to Hire Your First AI Employee?"
            className="text-3xl sm:text-4xl md:text-5xl font-medium text-axos-text-primary mb-6"
            style={{ letterSpacing: "-0.02em" }}
          />
          <p className="text-base md:text-lg text-axos-text-secondary leading-relaxed mb-10 max-w-xl mx-auto">
            Tell us about your business. We will design a Brain that fits your
            workflows, your systems, and your goals.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-axos-accent text-white font-medium hover:bg-axos-accent-hover transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-axos-accent-glow/30 text-base"
          >
            Contact Us
            <ArrowRight size={18} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
