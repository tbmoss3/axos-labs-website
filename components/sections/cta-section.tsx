"use client";

import Link from "next/link";
import { AnimatedSection } from "@/components/animations/animated-section";
import { RevealHeading } from "@/components/animations/reveal-heading";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-24 md:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <AnimatedSection className="max-w-3xl">
          <RevealHeading
            text="Ready to Hire Your First AI Employee?"
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-axos-text-primary mb-6"
            style={{ letterSpacing: "-0.02em" }}
          />
          <p className="text-base md:text-lg text-axos-text-secondary leading-relaxed mb-10 max-w-xl">
            Tell us about your business. We will design a Brain that fits your
            workflows, your systems, and your goals.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-axos-accent text-white text-sm font-medium hover:bg-axos-accent-hover transition-colors"
          >
            Contact Us
            <ArrowRight size={14} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
