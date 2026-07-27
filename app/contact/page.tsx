"use client";

import { IntakeForm } from "@/components/sections/intake-form";
import { CTASection } from "@/components/sections/cta-section";

export default function ContactPage() {
  return (
    <div className="pt-20">
      <IntakeForm />
      <CTASection />
    </div>
  );
}
