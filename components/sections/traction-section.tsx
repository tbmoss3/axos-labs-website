"use client";

import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/animated-section";
import {
  Building2,
  Home,
  Truck,
  Sparkles,
  CheckCircle2,
  Users,
  Clock,
  BarChart3,
} from "lucide-react";

const industries = [
  {
    icon: Building2,
    name: "Construction",
    description: "General contracting, specialty trades, project coordination — brains that track deadlines and dispatch crews.",
  },
  {
    icon: Home,
    name: "Real Estate",
    description: "Property management, brokerage, tenant services — our first vertical. Simmons & Harris: live brain since 2026.",
  },
  {
    icon: Truck,
    name: "Logistics",
    description: "Warehousing, yard management, dispatch — Premier Warehousing / YardLogic agentic operations in build.",
  },
  {
    icon: Sparkles,
    name: "More Coming Soon",
    description: "Healthcare, Manufacturing, Legal, Financial Services — Q4 2026 and beyond.",
  },
];

const tractionMetrics = [
  {
    icon: CheckCircle2,
    label: "Simmons & Harris",
    value: "Live brain since 2026",
    detail: "50 employees, ~20 hrs/week saved",
  },
  {
    icon: Truck,
    label: "Premier Warehousing",
    value: "Agentic yard management",
    detail: "In active development",
  },
  {
    icon: Users,
    label: "Pipeline",
    value: "3+ prospects",
    detail: "Requesting S&H-style brain for real estate",
  },
];

export function TractionSection() {
  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-axos-border-subtle">
      <div className="max-w-[1280px] mx-auto">
        {/* Industries */}
        <AnimatedSection>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-medium text-axos-text-primary mb-4 text-center"
            style={{ letterSpacing: "-0.02em" }}
          >
            Industries We&#39;ve Worked In
          </h2>
          <p className="text-axos-text-secondary text-center max-w-xl mx-auto mb-16">
            Real deployments. Real results. Not prototypes.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20" staggerDelay={0.1}>
          {industries.map((industry) => (
            <StaggerItem key={industry.name}>
              <div className="group rounded-xl border border-axos-border-standard bg-axos-bg-elevated p-6 hover:border-axos-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-axos-accent-glow/10 h-full">
                <div className="w-10 h-10 rounded-lg bg-axos-accent/10 flex items-center justify-center mb-4">
                  <industry.icon size={20} className="text-axos-accent" />
                </div>
                <h3 className="text-lg font-semibold text-axos-text-primary mb-2">
                  {industry.name}
                </h3>
                <p className="text-sm text-axos-text-secondary leading-relaxed">
                  {industry.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Traction Metrics */}
        <AnimatedSection>
          <h3
            className="text-2xl sm:text-3xl font-medium text-axos-text-primary mb-10 text-center"
            style={{ letterSpacing: "-0.02em" }}
          >
            Traction
          </h3>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.15}>
          {tractionMetrics.map((metric) => (
            <StaggerItem key={metric.label}>
              <div className="rounded-xl border border-axos-border-standard bg-axos-bg-surface p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-axos-accent/10 flex items-center justify-center">
                    <metric.icon size={20} className="text-axos-accent" />
                  </div>
                  <span className="text-sm font-medium text-axos-text-muted uppercase tracking-wider">
                    {metric.label}
                  </span>
                </div>
                <div className="text-2xl md:text-3xl font-semibold text-axos-text-primary mb-2">
                  {metric.value}
                </div>
                <p className="text-sm text-axos-text-secondary">{metric.detail}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
