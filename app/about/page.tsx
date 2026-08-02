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
              className="font-serif text-2xl sm:text-3xl md:text-4xl text-axos-text-primary mb-8"
              style={{ letterSpacing: "-0.02em" }}
            >
              OUR MISSION
            </h2>
            <div className="space-y-6 text-base md:text-lg text-axos-text-secondary leading-relaxed">
              <p className="text-axos-text-primary font-medium">
                We exist to empower every business with the tools — both custom
                and open source — to <em className="text-axos-accent font-semibold">own their own intelligence</em>.
              </p>
              <p>
                What does this mean in practice? We help businesses integrate
                artificial intelligence into every workflow and process in their
                business, all on one transparent open platform that gives you
                control over cost, model usage, code, and processes. This allows
                our clients to maintain sovereignty over their most sensitive
                data, processes, and competitive advantages.
              </p>
              <p>
                We are building privately owned, sovereign AI that runs on YOUR
                hardware, integrated with YOUR systems, operating under YOUR
                oversight.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
