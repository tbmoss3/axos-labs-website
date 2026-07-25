"use client";

import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/animated-section";
import { Plug, Brain, Zap } from "lucide-react";

const features = [
  {
    icon: Plug,
    title: "Integrates",
    description:
      "Connects to your existing systems — QBO, RentManager, CRM, and more. No rip-and-replace required.",
  },
  {
    icon: Brain,
    title: "Learns",
    description:
      "Remembers every decision and gets smarter over time. Your Brain evolves with your business.",
  },
  {
    icon: Zap,
    title: "Acts",
    description:
      "Processes work orders, files documents, dispatches vendors autonomously — 24/7, no breaks.",
  },
];

export function WhatIsBrainSection() {
  return (
    <section className="py-24 md:py-40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-medium text-axos-text-primary mb-6"
            style={{ letterSpacing: "-0.02em" }}
          >
            What Is a Brain?
          </h2>
          <p className="text-base md:text-lg text-axos-text-secondary leading-relaxed">
            A Brain is not a chatbot. Not a copilot. It is a persistent AI
            employee that lives inside your business, connects to your systems,
            and handles real workflows — end to end, autonomously.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <div className="group relative p-6 md:p-8 rounded-xl border border-axos-border-standard bg-axos-bg-elevated/50 backdrop-blur-sm hover:border-axos-accent/30 hover:bg-axos-bg-surface/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-axos-accent-glow/10">
                <div className="w-12 h-12 rounded-lg bg-axos-accent/10 border border-axos-accent/20 flex items-center justify-center mb-5 group-hover:bg-axos-accent/20 transition-colors">
                  <feature.icon size={22} className="text-axos-accent" />
                </div>
                <h3 className="text-xl font-medium text-axos-text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-axos-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
