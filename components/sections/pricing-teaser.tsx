"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatedSection } from "@/components/animations/animated-section";
import { RevealHeading } from "@/components/animations/reveal-heading";
import { Check, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const tiers = [
  {
    name: "Standard",
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
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pin the section and scrub the three cards to scroll progress.
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = gsap.utils.toArray<HTMLElement>(".price-card");
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
          gsap.utils.toArray<HTMLElement>(".price-card").forEach((card) => {
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
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <RevealHeading
            text="Custom Software + AI Brain Packages"
            className="text-3xl sm:text-4xl md:text-5xl font-medium text-axos-text-primary mb-6"
            style={{ letterSpacing: "-0.02em" }}
          />
          <p className="text-base md:text-lg text-axos-text-secondary leading-relaxed">
            Packages sized to your operation. Setup covers configuration,
            integration, and training. Ongoing service covers operation and
            continuous improvement. Talk to us for a quote tailored to your
            business.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {tiers.map((tier) => (
            <div key={tier.name} className="price-card relative h-full">
              <div
                className={`relative h-full flex flex-col p-6 md:p-8 rounded-2xl border transition-all duration-500 hover:-translate-y-1 ${
                  tier.featured
                    ? "border-axos-accent/30 bg-gradient-to-b from-axos-accent/[0.06] to-axos-accent/[0.02] shadow-[0_8px_32px_-8px_rgba(124,58,237,0.15),0_1px_3px_rgba(0,0,0,0.05)]"
                    : "border-black/[0.08] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,1)] hover:border-axos-accent/30 hover:shadow-[0_12px_40px_-12px_rgba(124,58,237,0.12),0_1px_3px_rgba(0,0,0,0.05)]"
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-axos-accent to-axos-accent-hover text-white text-xs font-medium shadow-lg shadow-axos-accent-glow/20">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-axos-text-primary mb-3">
                    {tier.name}
                  </h3>
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
                      : "border border-axos-border-standard text-axos-text-primary hover:bg-axos-bg-elevated"
                  }`}
                >
                  Get Started
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
