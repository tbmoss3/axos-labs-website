"use client";

import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/animated-section";
import { Download, Settings, Play, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Download,
    title: "Install",
    description:
      "Brain Type pre-configured for your industry. We ship a ready-to-deploy AI worker tuned to your vertical.",
  },
  {
    number: "02",
    icon: Settings,
    title: "Tune",
    description:
      "Our FDE connects your systems and workflows — ERP, CRM, accounting, dispatch — into a unified cognitive layer.",
  },
  {
    number: "03",
    icon: Play,
    title: "Operate",
    description:
      "Brain handles standard workflows autonomously. Work orders, filings, dispatches, invoices — all hands-free.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Evolve",
    description:
      "Gets smarter with every install in your vertical. Network effects compound. Each Brain makes the next one better.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 md:py-40 px-4 sm:px-6 lg:px-8 bg-axos-bg-elevated/30">
      <div className="max-w-[1280px] mx-auto">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-medium text-axos-text-primary mb-6"
            style={{ letterSpacing: "-0.02em" }}
          >
            How It Works
          </h2>
          <p className="text-base md:text-lg text-axos-text-secondary leading-relaxed">
            From installation to autonomous operation — four steps to your first
            AI employee.
          </p>
        </AnimatedSection>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          staggerDelay={0.12}
        >
          {steps.map((step, index) => (
            <StaggerItem key={step.number}>
              <div className="relative group">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-axos-border-standard">
                    <div className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-axos-border-standard" />
                  </div>
                )}

                <div className="relative p-6 md:p-8 rounded-xl border border-axos-border-standard bg-axos-bg-elevated/50 backdrop-blur-sm hover:border-axos-accent/30 hover:bg-axos-bg-surface/50 transition-all duration-300 hover:-translate-y-1">
                  {/* Number badge */}
                  <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-axos-accent flex items-center justify-center shadow-lg shadow-axos-accent-glow/30">
                    <span className="text-xs font-semibold text-white">
                      {step.number}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-lg bg-axos-accent/10 border border-axos-accent/20 flex items-center justify-center mb-5 mt-2 group-hover:bg-axos-accent/20 transition-colors">
                    <step.icon size={22} className="text-axos-accent" />
                  </div>

                  <h3 className="text-xl font-medium text-axos-text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-axos-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
