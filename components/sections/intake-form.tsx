"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/animations/animated-section";
import {
  Code,
  Brain,
  Check,
  Loader2,
  ChevronDown,
  AlertCircle,
} from "lucide-react";

type FormPath = "software" | "brain";

interface FormData {
  type: FormPath;
  companyName: string;
  industry: string;
  companySize: string;
  systems: string;
  problemDescription: string;
  workflows: string;
  hoursPerWeek: string;
  deployment: string;
  email: string;
  phone: string;
}

const initialFormData: FormData = {
  type: "software",
  companyName: "",
  industry: "",
  companySize: "",
  systems: "",
  problemDescription: "",
  workflows: "",
  hoursPerWeek: "",
  deployment: "",
  email: "",
  phone: "",
};

const industries = [
  "Construction",
  "Real Estate",
  "Logistics",
  "Healthcare",
  "Manufacturing",
  "Legal",
  "Financial Services",
  "Other",
];

const companySizes = [
  "1-10",
  "11-50",
  "51-100",
  "101-250",
  "251-500",
  "500+",
];

const deploymentOptions = [
  { value: "cloud", label: "Cloud Concierge" },
  { value: "onpremise", label: "On-Premise" },
  { value: "sovereignty", label: "Sovereignty Operations" },
];

export function IntakeForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    if (!formData.industry) newErrors.industry = "Industry is required";
    if (!formData.companySize) newErrors.companySize = "Company size is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (formData.type === "software") {
      if (!formData.problemDescription.trim())
        newErrors.problemDescription = "Please describe the problem";
    } else {
      if (!formData.workflows.trim())
        newErrors.workflows = "Please describe the workflows";
      if (!formData.deployment) newErrors.deployment = "Deployment preference is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSuccess(true);
        setFormData(initialFormData);
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch {
      setErrors({ email: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    field: keyof FormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const switchPath = (path: FormPath) => {
    setFormData((prev) => ({ ...prev, type: path }));
    setErrors({});
  };

  const inputClass = (field: keyof FormData) =>
    `w-full rounded-lg border px-4 py-3 bg-axos-bg-elevated text-axos-text-primary placeholder:text-axos-text-muted focus:outline-none focus:ring-2 focus:ring-axos-accent/30 transition-colors ${
      errors[field]
        ? "border-red-400 focus:border-red-500"
        : "border-axos-border-standard focus:border-axos-accent"
    }`;

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-axos-border-subtle">
      <div className="max-w-[1280px] mx-auto">
        <AnimatedSection>
          <h2
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-axos-text-primary mb-4 text-center"
            style={{ letterSpacing: "-0.02em" }}
          >
            Get Started
          </h2>
          <p className="text-axos-text-secondary text-center max-w-xl mx-auto mb-12">
            Tell us about your company and what you&#39;re looking for.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="max-w-2xl mx-auto">
            {/* Path Toggle */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <button
                type="button"
                onClick={() => switchPath("software")}
                className={`relative rounded-xl border p-6 text-left transition-all duration-300 ${
                  formData.type === "software"
                    ? "border-axos-accent bg-axos-accent/5 shadow-lg shadow-axos-accent-glow/10"
                    : "border-axos-border-standard bg-axos-bg-elevated hover:border-axos-accent/20"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      formData.type === "software"
                        ? "bg-axos-accent/20"
                        : "bg-axos-bg-surface"
                    }`}
                  >
                    <Code
                      size={20}
                      className={
                        formData.type === "software"
                          ? "text-axos-accent"
                          : "text-axos-text-secondary"
                      }
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-axos-text-primary">
                      Custom Software
                    </h3>
                    <p className="text-xs text-axos-text-muted">
                      Bespoke builds and integrations
                    </p>
                  </div>
                </div>
                {formData.type === "software" && (
                  <motion.div
                    layoutId="activePath"
                    className="absolute inset-0 rounded-xl border-2 border-axos-accent pointer-events-none"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </button>

              <button
                type="button"
                onClick={() => switchPath("brain")}
                className={`relative rounded-xl border p-6 text-left transition-all duration-300 ${
                  formData.type === "brain"
                    ? "border-axos-accent bg-axos-accent/5 shadow-lg shadow-axos-accent-glow/10"
                    : "border-axos-border-standard bg-axos-bg-elevated hover:border-axos-accent/20"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      formData.type === "brain"
                        ? "bg-axos-accent/20"
                        : "bg-axos-bg-surface"
                    }`}
                  >
                    <Brain
                      size={20}
                      className={
                        formData.type === "brain"
                          ? "text-axos-accent"
                          : "text-axos-text-secondary"
                      }
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-axos-text-primary">
                      AI Brain
                    </h3>
                    <p className="text-xs text-axos-text-muted">
                      Persistent AI employee
                    </p>
                  </div>
                </div>
                {formData.type === "brain" && (
                  <motion.div
                    layoutId="activePath"
                    className="absolute inset-0 rounded-xl border-2 border-axos-accent pointer-events-none"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </button>
            </div>

            {/* Success Message */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 rounded-xl border border-axos-success/30 bg-axos-success/10 p-4 flex items-center gap-3"
                >
                  <Check size={20} className="text-axos-success shrink-0" />
                  <p className="text-sm text-axos-text-primary">
                    Thanks! We&#39;ll be in touch within 24 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shared Fields */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-axos-text-secondary mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleChange("companyName", e.target.value)}
                    placeholder="Acme Corp"
                    className={inputClass("companyName")}
                  />
                  {errors.companyName && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.companyName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-axos-text-secondary mb-2">
                    Industry *
                  </label>
                  <div className="relative">
                    <select
                      value={formData.industry}
                      onChange={(e) => handleChange("industry", e.target.value)}
                      className={`${inputClass("industry")} appearance-none cursor-pointer`}
                    >
                      <option value="">Select industry</option>
                      {industries.map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-axos-text-muted pointer-events-none"
                    />
                  </div>
                  {errors.industry && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.industry}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-axos-text-secondary mb-2">
                    Company Size *
                  </label>
                  <div className="relative">
                    <select
                      value={formData.companySize}
                      onChange={(e) => handleChange("companySize", e.target.value)}
                      className={`${inputClass("companySize")} appearance-none cursor-pointer`}
                    >
                      <option value="">Select size</option>
                      {companySizes.map((s) => (
                        <option key={s} value={s}>
                          {s} employees
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-axos-text-muted pointer-events-none"
                    />
                  </div>
                  {errors.companySize && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.companySize}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-axos-text-secondary mb-2">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="you@company.com"
                    className={inputClass("email")}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-axos-text-secondary mb-2">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="(555) 123-4567"
                  className={inputClass("phone")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-axos-text-secondary mb-2">
                  What systems do you{" "}
                  {formData.type === "brain" ? "want the Brain to connect to" : "use"}?
                </label>
                <textarea
                  value={formData.systems}
                  onChange={(e) => handleChange("systems", e.target.value)}
                  placeholder={
                    formData.type === "brain"
                      ? "QuickBooks, RentManager, Salesforce, Slack..."
                      : "QuickBooks, RentManager, Salesforce..."
                  }
                  rows={3}
                  className={`${inputClass("systems")} resize-none`}
                />
              </div>

              {/* Path-specific fields */}
              <AnimatePresence mode="wait">
                {formData.type === "software" ? (
                  <motion.div
                    key="software"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 overflow-hidden"
                  >
                    <div>
                      <label className="block text-sm font-medium text-axos-text-secondary mb-2">
                        What problem are you trying to solve? *
                      </label>
                      <textarea
                        value={formData.problemDescription}
                        onChange={(e) =>
                          handleChange("problemDescription", e.target.value)
                        }
                        placeholder="Describe the pain point or workflow you need help with..."
                        rows={4}
                        className={`${inputClass("problemDescription")} resize-none`}
                      />
                      {errors.problemDescription && (
                        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {errors.problemDescription}
                        </p>
                      )}
                    </div>

                  </motion.div>
                ) : (
                  <motion.div
                    key="brain"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 overflow-hidden"
                  >
                    <div>
                      <label className="block text-sm font-medium text-axos-text-secondary mb-2">
                        What workflows should the Brain handle? *
                      </label>
                      <textarea
                        value={formData.workflows}
                        onChange={(e) =>
                          handleChange("workflows", e.target.value)
                        }
                        placeholder="Process work orders, dispatch vendors, file court papers..."
                        rows={4}
                        className={`${inputClass("workflows")} resize-none`}
                      />
                      {errors.workflows && (
                        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {errors.workflows}
                        </p>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-axos-text-secondary mb-2">
                          Estimated hours/week on repetitive tasks
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={formData.hoursPerWeek}
                          onChange={(e) =>
                            handleChange("hoursPerWeek", e.target.value)
                          }
                          placeholder="20"
                          className={inputClass("hoursPerWeek")}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-axos-text-secondary mb-2">
                          Preferred Deployment *
                        </label>
                        <div className="space-y-2">
                          {deploymentOptions.map((opt) => (
                            <label
                              key={opt.value}
                              className="flex items-center gap-3 cursor-pointer group"
                            >
                              <div className="relative">
                                <input
                                  type="radio"
                                  name="deployment"
                                  value={opt.value}
                                  checked={formData.deployment === opt.value}
                                  onChange={(e) =>
                                    handleChange("deployment", e.target.value)
                                  }
                                  className="sr-only"
                                />
                                <div
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                                    formData.deployment === opt.value
                                      ? "border-axos-accent"
                                      : "border-axos-border-standard group-hover:border-axos-accent/50"
                                  }`}
                                >
                                  {formData.deployment === opt.value && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-axos-accent" />
                                  )}
                                </div>
                              </div>
                              <span className="text-sm text-axos-text-secondary group-hover:text-axos-text-primary transition-colors">
                                {opt.label}
                              </span>
                            </label>
                          ))}
                        </div>
                        {errors.deployment && (
                          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle size={12} />
                            {errors.deployment}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-axos-accent text-white font-medium hover:bg-axos-accent-hover transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-axos-accent-glow/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>Submit Request</>
                  )}
                </button>
              </div>
            </form>

            {/* Contact info */}
            <div className="mt-12 pt-8 border-t border-axos-border-subtle text-center">
              <p className="text-sm text-axos-text-muted">
                Prefer email?{" "}
                <a
                  href="mailto:hello@axoslabs.com"
                  className="text-axos-accent hover:text-axos-accent-hover transition-colors"
                >
                  hello@axoslabs.com
                </a>
              </p>
              <p className="text-xs text-axos-text-muted mt-2">
                Response within 24 hours
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
