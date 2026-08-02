import { AnimatedSection } from "@/components/animations/animated-section";
import { CTASection } from "@/components/sections/cta-section";

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-semibold text-axos-text-primary mb-6"
              style={{ letterSpacing: "-0.03em" }}
            >
              About Axos Labs
            </h1>
            <p className="text-lg md:text-xl text-axos-text-secondary leading-relaxed">
              We build the enterprise layer on open-source AI.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-axos-bg-elevated">
        <div className="max-w-[1280px] mx-auto">
          <AnimatedSection className="max-w-3xl mx-auto">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-medium text-axos-text-primary mb-8"
              style={{ letterSpacing: "-0.02em" }}
            >
              Our Mission
            </h2>
            <div className="space-y-6 text-base md:text-lg text-axos-text-secondary leading-relaxed">
              <p>
                Every company deserves an AI Brain — a
                persistent, autonomous worker that understands their business,
                connects to their systems, and handles the repetitive work that
                slows teams down.
              </p>
              <p>
                We are building the anti-cloud-AI. Private, owned, sovereign AI
                that runs on YOUR hardware, integrated with YOUR systems,
                operating under YOUR oversight.
              </p>
              <p>
                Our open-core model means you get the benefits of
                enterprise-grade AI without surrendering your data to someone
                else is cloud.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Two Pillars */}
      <section className="py-24 md:py-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-medium text-axos-text-primary mb-6"
              style={{ letterSpacing: "-0.02em" }}
            >
              How We Work
            </h2>
            <p className="text-base md:text-lg text-axos-text-secondary leading-relaxed">
              Two revenue pillars. One mission.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
            {[
              {
                num: "01",
                title: "Custom Software",
                desc: "Development and maintenance contracts that fund everything else. Bespoke integrations, workflow tools, and system connectors.",
              },
              {
                num: "02",
                title: "AI Brains",
                desc: "The core product. End-to-end brain installation and operation. Persistent AI employees that transform how your business runs.",
              },
            ].map((pillar) => (
              <AnimatedSection key={pillar.num} delay={Number(pillar.num) * 0.1}>
                <div className="p-6 md:p-8 rounded-xl border border-axos-border-standard bg-axos-bg-surface hover:border-axos-accent/30 hover:bg-white hover:shadow-lg hover:shadow-axos-accent-glow/10 transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="w-10 h-10 rounded-full bg-axos-accent flex items-center justify-center mb-5 shadow-lg shadow-axos-accent-glow/20">
                    <span className="text-xs font-semibold text-white">
                      {pillar.num}
                    </span>
                  </div>
                  <h3 className="text-xl font-medium text-axos-text-primary mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-axos-text-secondary leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Traction */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-axos-bg-elevated">
        <div className="max-w-[1280px] mx-auto">
          <AnimatedSection className="max-w-3xl mx-auto mb-12">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-medium text-axos-text-primary mb-6"
              style={{ letterSpacing: "-0.02em" }}
            >
              Traction
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedSection delay={0.1}>
              <div className="p-6 md:p-8 rounded-xl border border-axos-border-standard bg-axos-bg-surface">
                <div className="text-sm font-medium text-axos-accent mb-2">
                  Real Estate Client
                </div>
                <div className="text-2xl font-semibold text-axos-text-primary mb-2">
                  Live Brain Since 2026
                </div>
                <p className="text-sm text-axos-text-secondary leading-relaxed">
                  50 employees. Real estate property management. ~20 hours/week
                  saved through automated work order processing, vendor
                  dispatch, and court filing workflows.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="p-6 md:p-8 rounded-xl border border-axos-border-standard bg-axos-bg-surface">
                <div className="text-sm font-medium text-axos-accent mb-2">
                  Logistics Client
                </div>
                <div className="text-2xl font-semibold text-axos-text-primary mb-2">
                  In Build
                </div>
                <p className="text-sm text-axos-text-secondary leading-relaxed">
                  Agentic yard management system under development. Logistics
                  vertical expansion in progress.
                </p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.3} className="mt-8">
            <div className="p-6 md:p-8 rounded-xl border border-axos-border-standard bg-axos-bg-surface">
              <div className="text-sm font-medium text-axos-accent mb-2">
                Pipeline
              </div>
              <p className="text-sm text-axos-text-secondary leading-relaxed">
                3+ prospects requesting a similar Brain for their real estate
                operations. Active conversations in construction and logistics
                verticals.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Founder */}
      <section className="py-24 md:py-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto">
          <AnimatedSection className="text-center max-w-2xl mx-auto">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-medium text-axos-text-primary mb-8"
              style={{ letterSpacing: "-0.02em" }}
            >
              Built By
            </h2>
            <div className="p-8 md:p-10 rounded-xl border border-axos-border-standard bg-axos-bg-surface inline-block hover:shadow-lg hover:shadow-axos-accent-glow/10 transition-all duration-300 hover:-translate-y-1">
              <div className="w-20 h-20 rounded-full bg-axos-accent/10 border border-axos-accent/20 flex items-center justify-center mx-auto mb-5">
                <span className="text-2xl font-semibold text-axos-accent">
                  BM
                </span>
              </div>
              <h3 className="text-xl font-medium text-axos-text-primary mb-1">
                Benton Moss
              </h3>
              <p className="text-sm text-axos-accent font-medium mb-3">
                Founder & CEO
              </p>
              <p className="text-sm text-axos-text-secondary leading-relaxed max-w-sm">
                Building the enterprise layer on open-source AI. Obsessed with
                making AI work for real businesses, not just demos.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
