"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatedSection } from "@/components/animations/animated-section";
import { RevealHeading } from "@/components/animations/reveal-heading";
import { Plug, Brain, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pin the section and scrub the three cards to scroll progress.
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = gsap.utils.toArray<HTMLElement>(".wib-card");
          gsap.set(cards, { opacity: 0.01, y: 60 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container.current,
              start: "center center",
              end: "+=1000",
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
          gsap.utils.toArray<HTMLElement>(".wib-card").forEach((card) => {
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
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-axos-accent/30 to-transparent mx-auto mb-6" />
          <RevealHeading
            text="What Is a Brain?"
            className="text-3xl sm:text-4xl md:text-5xl font-medium text-axos-text-primary mb-6"
            style={{ letterSpacing: "-0.02em" }}
          />
          <p className="text-base md:text-lg text-axos-text-secondary leading-relaxed">
            A Brain is not a chatbot. Not a copilot. It is a persistent AI
            employee that lives inside your business, connects to your systems,
            and handles real workflows — end to end, autonomously.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {features.map((feature) => (
            <div key={feature.title} className="wib-card relative group h-full">
              <div className="h-full flex flex-col p-6 md:p-8 rounded-2xl border border-black/[0.08] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,1)] hover:border-axos-accent/30 hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(124,58,237,0.15),0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-axos-accent/10 border border-axos-accent/15 flex items-center justify-center mb-5 group-hover:bg-axos-accent/15 group-hover:scale-105 transition-all duration-500">
                  <feature.icon size={22} className="text-axos-accent" />
                </div>
                <h3 className="text-xl font-medium text-axos-text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-axos-text-secondary leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
