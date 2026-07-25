"use client";

import { AnimatedSection } from "@/components/animations/animated-section";

export function MissionSection() {
  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto">
        <AnimatedSection>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-medium text-axos-text-primary mb-10 text-center"
            style={{ letterSpacing: "-0.02em" }}
          >
            Our Mission
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="max-w-3xl mx-auto space-y-6 text-axos-text-secondary leading-relaxed text-base md:text-lg">
            <p>
              Axos Labs exists because every 50-500 employee company deserves an AI
              employee — not a chatbot, not a copilot, but a persistent Brain that
              lives inside your business, understands your workflows, and works
              autonomously under your oversight.
            </p>
            <p>
              We are the{" "}
              <span className="text-axos-text-primary font-medium">
                Red Hat of Business AI
              </span>
              . That means we build on open-source foundations, wrap them in
              enterprise-grade reliability, and deliver them as private, sovereign
              systems that run on your hardware. No data leaves your premises unless
              you want it to. No vendor lock-in. No black-box APIs holding your
              operations hostage.
            </p>
            <p>
              Our open-core model means the core Brain technology stays open and
              auditable, while our enterprise layer — integrations, tuning, support,
              and compliance — is where we build durable competitive advantage.
              Privacy-first is not a feature. It is the foundation.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
