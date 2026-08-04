import { BrainIntakeWizard } from "@/components/sections/brain-intake-wizard";
import { CTASection } from "@/components/sections/cta-section";

export default function BrainArchitecturePage() {
  return (
    <div className="pt-20">
      <BrainIntakeWizard />
      <CTASection />
    </div>
  );
}
