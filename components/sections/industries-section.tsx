"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatedSection } from "@/components/animations/animated-section";
import { RevealHeading } from "@/components/animations/reveal-heading";
import { HardHat, Building2, Truck, Stethoscope } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
      "Work orders, tenant screening, court filings, invoicing — our first vertical, live in production since 2026.",
    status: "Live",
  },
  {
    icon: Truck,
    title: "Logistics",
    description:
      "Yard management, dispatch coordination, inventory sync — logistics deployment in build.",
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
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pin the section and scrub the four cards to scroll progress.
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = gsap.utils.toArray<HTMLElement>(".ind-card");
          gsap.set(cards, { opacity: 0.01, y: 60 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container.current,
              start: "center center",
              end: "+=1200",
              pin: true,
              scrub: 0.6,
            },
          });
          cards.forEach((card) => {
            tl.to(card, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
          });
          tl.to({}, { duration: 0.5 });
        }
      );

      // Mobile/tablet: simple once-per-card reveal on scroll, no pinning.
      mm.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.utils.toArray<HTMLElement>(".ind-card").forEach((card) => {
            gsap.from(card, {
              opacity: 0.01,
              y: 30,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: { trigger: card, start: "top 85%", once: true },
            });
          });
        }
      );

      return () => mm.revert();
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative py-24 md:py-40 px-4 sm:px-6 lg:px-8"
    >
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {industries.map((industry) => (
            <div key={industry.title} className="ind-card relative group h-full">
              <div className="h-full flex flex-col p-6 md:p-8 rounded-2xl border border-black/[0.08] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,1)] hover:border-axos-accent/30 hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(124,58,237,0.15),0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-500">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-axos-accent/10 border border-axos-accent/15 flex items-center justify-center group-hover:bg-axos-accent/15 group-hover:scale-105 transition-all duration-500">
                    <industry.icon size={22} className="text-axos-accent" />
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      industry.status === "Live"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : industry.status === "In Build"
                        ? "bg-axos-accent/10 text-axos-accent border border-axos-accent/20"
                        : "bg-gray-100 text-gray-500 border border-gray-200"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
