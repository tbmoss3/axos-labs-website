"use client";

import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/animated-section";
import { Check, ArrowRight } from "lucide-react";

const tiers = [
  {
    name: "Standard",
    setup: "$25K",
    monthly: "$5K/mo",
    description: "Perfect for single-location operations with 10–50 employees.",
    features: [
      "Single Brain instance",
      "Up to 3 system integrations",
      "Standard support (business hours)",
      "Monthly performance reports",
    ],
    featured: false,
  },
  {
    name: "Premium",
    setup: "$75K",
    monthly: "$12K/mo",
    description:
      "For multi-location businesses with 50–250 employees and complex workflows.",
    features: [
      "Multi-Brain orchestration",
      "Unlimited system integrations",
      "Priority support (24/7)",
      "Weekly performance reports",
      "Custom workflow development",
    ],
    featured: true,
  },
  {
    name: "Strategic",
    setup: "$150K+",
    monthly: "$25K+/mo",
    description:
      "Enterprise deployment for 250+ employees. Dedicated FDE, custom R&D.",
    features: [
      "Unlimited Brain instances",
      "Dedicated FDE on retainer",
      "White-glove onboarding",
      "Custom model fine-tuning",
      "Sovereignty operations option",
      "Quarterly business reviews",
    ],
    featured: false,
  },
];

export function PricingTeaser() {
  return (
    <section className="relative py-24 md:py-40 px-4 sm:px-6 lg:px-8">
      {/* Section divider: horizontal rule before heading */}
      <div className="max-w-[1280px] mx-auto mb-24 md:mb-32">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>
      <div className="max-w-[1280px] mx-auto">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-medium text-axos-text-primary mb-6"
            style={{ letterSpacing: "-0.02em" }}
          >
            Custom Software + AI Brain Packages
          </h2>
          <p className="text-base md:text-lg text-axos-text-secondary leading-relaxed">
            Transparent pricing for real AI employees. Setup covers
            configuration, integration, and training. Monthly covers operation
            and continuous improvement.
          </p>
        </AnimatedSection>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch"
          staggerDelay={0.1}
        >
          {tiers.map((tier) => (
            <StaggerItem key={tier.name} className="h-full">
              <div
                className={`relative h-full flex flex-col p-6 md:p-8 rounded-2xl border transition-all duration-500 hover:-translate-y-1 ${
                  tier.featured
                    ? "border-axos-accent/40 bg-gradient-to-b from-axos-accent/[0.08] to-axos-accent/[0.02] shadow-[0_8px_32px_-8px_rgba(124,58,237,0.25),inset_0_1px_0_rgba(255,255,255,0.08)]"
                    : "border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_0_1px_rgba(0,0,0,0.2)] hover:border-axos-accent/30 hover:shadow-[0_12px_40px_-12px_rgba(124,58,237,0.2),inset_0_1px_0_rgba(255,255,255,0.08)]"
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-axos-accent to-axos-accent-hover text-white text-xs font-medium shadow-lg shadow-axos-accent-glow/30">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-medium text-axos-text-primary mb-2">
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-semibold text-axos-text-primary">
                      {tier.setup}
                    </span>
                    <span className="text-sm text-axos-text-muted">setup</span>
                  </div>
                  <div className="text-sm text-axos-accent font-medium mb-4">
                    + {tier.monthly}
                  </div>
                  <p className="text-sm text-axos-text-secondary leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-axos-text-secondary"
                    >
                      <Check
                        size={16}
                        className="text-axos-accent mt-0.5 flex-shrink-0"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/contact"
                  className={`inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-lg font-medium text-sm transition-all hover:-translate-y-0.5 ${
                    tier.featured
                      ? "bg-axos-accent text-white hover:bg-axos-accent-hover shadow-lg shadow-axos-accent-glow/20"
                      : "border border-axos-border-standard text-axos-text-primary hover:bg-axos-bg-surface"
                  }`}
                >
                  Get Started
                  <ArrowRight size={14} />
                </a>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
