"use client";

import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/animated-section";
import { RevealHeading } from "@/components/animations/reveal-heading";
import { HardHat, Building2, Truck, Stethoscope } from "lucide-react";

const industries = [
  {
    icon: HardHat,
    title: "Construction",
    description:
      "Project tracking, vendor dispatch, compliance management, and automated documentation.",
    status: "Live",
  },
  {
    icon: Building2,
    title: "Real Estate",
    description:
      "Work orders, tenant screening, court filings, invoicing — our first vertical. Simmons & Harris: live brain since 2026.",
    status: "Live",
  },
  {
    icon: Truck,
    title: "Logistics",
    description:
      "Yard management, dispatch coordination, inventory sync — Premier Warehousing/YardLogic in progress.",
    status: "In Build",
  },
  {
    icon: Stethoscope,
    title: "More Coming Soon",
    description:
      "Healthcare, Manufacturing, Legal, and Financial Services — Q4 2026 and beyond.",
    status: "Roadmap",
  },
];

export function IndustriesSection() {
  return (
    <section className="py-24 md:py-40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <RevealHeading
            text="Industries We Serve"
            className="text-3xl sm:text-4xl md:text-5xl font-medium text-axos-text-primary mb-6"
            style={{ letterSpacing: "-0.02em" }}
          />
          <p className="text-base md:text-lg text-axos-text-secondary leading-relaxed">
            Brains tailored to the workflows, regulation, and systems of each
            vertical.
          </p>
        </AnimatedSection>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8"
          staggerDelay={0.1}
        >
          {industries.map((industry) => (
            <StaggerItem key={industry.title}>
              <div className="group p-6 md:p-8 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_0_1px_rgba(0,0,0,0.2)] hover:border-axos-accent/30 hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(124,58,237,0.2),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-500 h-full flex flex-col">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-axos-accent/10 border border-axos-accent/20 flex items-center justify-center group-hover:bg-axos-accent/20 group-hover:scale-105 transition-all duration-500">
                    <industry.icon size={22} className="text-axos-accent" />
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      industry.status === "Live"
                        ? "bg-axos-success/10 text-axos-success border border-axos-success/20"
                        : industry.status === "In Build"
                        ? "bg-axos-accent/10 text-axos-accent border border-axos-accent/20"
                        : "bg-axos-text-muted/10 text-axos-text-muted border border-axos-text-muted/20"
                    }`}
                  >
                    {industry.status}
                  </span>
                </div>
                <h3 className="text-xl font-medium text-axos-text-primary mb-3">
                  {industry.title}
                </h3>
                <p className="text-sm text-axos-text-secondary leading-relaxed flex-grow">
                  {industry.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
