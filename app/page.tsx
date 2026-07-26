import { HeroSection } from "@/components/sections/hero-section";
import { WhatIsBrainSection } from "@/components/sections/what-is-brain-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { IndustriesSection } from "@/components/sections/industries-section";
import { PricingTeaser } from "@/components/sections/pricing-teaser";
import { CTASection } from "@/components/sections/cta-section";
import { SectionBeam } from "@/components/animations/section-beam";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <SectionBeam />
      <WhatIsBrainSection />
      <SectionBeam />
      <HowItWorksSection />
      <SectionBeam />
      <IndustriesSection />
      <SectionBeam />
      <PricingTeaser />
      <SectionBeam />
      <CTASection />
    </div>
  );
}
