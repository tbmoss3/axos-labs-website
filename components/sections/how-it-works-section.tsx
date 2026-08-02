"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatedSection } from "@/components/animations/animated-section";
import { RevealHeading } from "@/components/animations/reveal-heading";
import { WorkflowVisualization } from "@/components/graphics/workflow-visualization";
import { Download, Settings, Play, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = gsap.utils.toArray<HTMLElement>(".hiw-card");
          const connectors = gsap.utils.toArray<HTMLElement>(".hiw-connector");
          gsap.set(cards, { opacity: 0.01, y: 60 });
          gsap.set(connectors, { scaleX: 0, transformOrigin: "left center" });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container.current,
              start: "center center",
              end: "+=1200",
              pin: true,
              scrub: 0.6,
            },
          });
          cards.forEach((card, i) => {
            tl.to(card, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
            if (connectors[i]) {
              tl.to(
                connectors[i],
                { scaleX: 1, duration: 0.4, ease: "none" },
                ">-0.15"
              );
            }
          });
          tl.to({}, { duration: 0.5 });
        }
      );

      mm.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.utils.toArray<HTMLElement>(".hiw-card").forEach((card) => {
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
      className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-[1280px] mx-auto">
        <AnimatedSection className="max-w-3xl mb-16 md:mb-20">
          <RevealHeading
            text="How It Works"
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-axos-text-primary mb-6"
            style={{ letterSpacing: "-0.02em" }}
          />
          <p className="text-base md:text-lg text-axos-text-secondary leading-relaxed max-w-2xl">
            From installation to autonomous operation — four steps to your first
            AI employee.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="hiw-card relative h-full">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hiw-connector hidden lg:block absolute top-8 left-full w-full h-px bg-axos-border-standard">
                  <div className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-axos-border-standard" />
                </div>
              )}

              <div className="relative h-full flex flex-col p-6 md:p-8 rounded-lg border border-black/[0.08] bg-white hover:border-black/15 transition-colors duration-300">
                <span className="text-xs font-medium text-axos-text-muted mb-6">
                  {step.number}
                </span>

                <div className="w-10 h-10 flex items-center justify-center mb-5">
                  <step.icon size={22} className="text-axos-text-primary" />
                </div>

                <h3 className="text-lg font-semibold text-axos-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-axos-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Workflow visualization */}
        <div className="mt-16 md:mt-20 p-8 rounded-lg border border-black/[0.08] bg-white">
          <p className="text-[10px] uppercase tracking-wider text-axos-text-muted mb-6">
            Example: Work Order Resolution
          </p>
          <WorkflowVisualization />
        </div>
      </div>
    </section>
  );
}
