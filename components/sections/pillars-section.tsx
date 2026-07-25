"use client";

import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/animated-section";
import { Code, Brain, Rocket } from "lucide-react";

const pillars = [
  {
    number: "01",
    title: "Custom Software",
    description:
      "Development and maintenance contracts that fund everything else. We build bespoke tools, integrations, and automations tailored to your business workflows.",
    icon: Code,
    color: "#22c55e",
  },
  {
    number: "02",
    title: "AI Brains",
    description:
      "The core product. End-to-end brain installation and operation. A persistent AI employee that integrates with your systems, learns your processes, and acts autonomously.",
    icon: Brain,
    color: "#7c3aed",
  },
  {
    number: "03",
    title: "Other Bets",
    description:
      "Strategic acquisitions, ventures, and investments that compound our expertise and expand the Axos ecosystem into adjacent markets and technologies.",
    icon: Rocket,
    color: "#3b82f6",
  },
];

export function PillarsSection() {
  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-axos-border-subtle">
      <div className="max-w-[1280px] mx-auto">
        <AnimatedSection>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-medium text-axos-text-primary mb-4 text-center"
            style={{ letterSpacing: "-0.02em" }}
          >
            How We Work
          </h2>
          <p className="text-axos-text-secondary text-center max-w-xl mx-auto mb-16">
            Three pillars. One mission. Building the enterprise layer on open-source AI.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.15}>
          {pillars.map((pillar) => (
            <StaggerItem key={pillar.number}>
              <div className="group relative rounded-xl border border-axos-border-standard bg-axos-bg-elevated p-6 md:p-8 hover:border-axos-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-axos-accent-glow/10">
                {/* Number badge */}
                <span
                  className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-6"
                  style={{
                    backgroundColor: `${pillar.color}15`,
                    color: pillar.color,
                  }}
                >
                  PILLAR {pillar.number}
                </span>

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${pillar.color}15` }}
                >
                  <pillar.icon size={20} style={{ color: pillar.color }} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-axos-text-primary mb-3">
                  {pillar.title}
                </h3>
                <p className="text-axos-text-secondary leading-relaxed text-sm md:text-base">
                  {pillar.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
