"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/animations/animated-section";
import { CTASection } from "@/components/sections/cta-section";
import { Send, CheckCircle } from "lucide-react";

type FormType = "software" | "brain";

export default function ContactPage() {
  const [formType, setFormType] = useState<FormType>("brain");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission — real API will be wired by Agent 2
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

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
              Get Started
            </h1>
            <p className="text-lg md:text-xl text-axos-text-secondary leading-relaxed">
              Tell us about your company and what you are looking for.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-8 md:py-16 px-4 sm:px-6 lg:px-8 pb-24 md:pb-40">
        <div className="max-w-[800px] mx-auto">
          <AnimatedSection>
            {/* Path Toggle */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <button
                type="button"
                onClick={() => setFormType("software")}
                className={`p-5 md:p-6 rounded-xl border text-left transition-all duration-300 ${
                  formType === "software"
                    ? "border-axos-accent bg-axos-accent/10 shadow-lg shadow-axos-accent-glow/10"
                    : "border-axos-border-standard bg-axos-bg-elevated/50 hover:border-axos-accent/30"
                }`}
              >
                <div className="text-lg font-medium text-axos-text-primary mb-1">
                  Custom Software
                </div>
                <div className="text-sm text-axos-text-secondary">
                  Bespoke builds and integrations
                </div>
              </button>
              <button
                type="button"
                onClick={() => setFormType("brain")}
                className={`p-5 md:p-6 rounded-xl border text-left transition-all duration-300 ${
                  formType === "brain"
                    ? "border-axos-accent bg-axos-accent/10 shadow-lg shadow-axos-accent-glow/10"
                    : "border-axos-border-standard bg-axos-bg-elevated/50 hover:border-axos-accent/30"
                }`}
              >
                <div className="text-lg font-medium text-axos-text-primary mb-1">
                  AI Brain
                </div>
                <div className="text-sm text-axos-text-secondary">
                  Persistent AI employee
                </div>
              </button>
            </div>

            {submitted ? (
              <div className="p-10 md:p-14 rounded-xl border border-axos-success/30 bg-axos-success/5 text-center">
                <CheckCircle
                  size={48}
                  className="text-axos-success mx-auto mb-4"
                />
                <h3 className="text-xl font-medium text-axos-text-primary mb-2">
                  Message Sent
                </h3>
                <p className="text-sm text-axos-text-secondary">
                  We will be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 md:p-10 rounded-xl border border-axos-border-standard bg-axos-bg-elevated/50 backdrop-blur-sm space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-axos-text-primary mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-axos-bg-surface border border-axos-border-standard text-axos-text-primary text-sm placeholder:text-axos-text-muted focus:outline-none focus:border-axos-accent focus:ring-1 focus:ring-axos-accent/30 transition-all"
                      placeholder="Acme Inc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-axos-text-primary mb-2">
                      Industry
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 rounded-lg bg-axos-bg-surface border border-axos-border-standard text-axos-text-primary text-sm focus:outline-none focus:border-axos-accent focus:ring-1 focus:ring-axos-accent/30 transition-all appearance-none"
                    >
                      <option value="">Select industry</option>
                      <option>Construction</option>
                      <option>Real Estate</option>
                      <option>Logistics</option>
                      <option>Healthcare</option>
                      <option>Manufacturing</option>
                      <option>Legal</option>
                      <option>Financial Services</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-axos-text-primary mb-2">
                      Company Size
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 rounded-lg bg-axos-bg-surface border border-axos-border-standard text-axos-text-primary text-sm focus:outline-none focus:border-axos-accent focus:ring-1 focus:ring-axos-accent/30 transition-all appearance-none"
                    >
                      <option value="">Select size</option>
                      <option>1-10</option>
                      <option>11-50</option>
                      <option>51-100</option>
                      <option>101-250</option>
                      <option>251-500</option>
                      <option>500+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-axos-text-primary mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-axos-bg-surface border border-axos-border-standard text-axos-text-primary text-sm placeholder:text-axos-text-muted focus:outline-none focus:border-axos-accent focus:ring-1 focus:ring-axos-accent/30 transition-all"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-axos-text-primary mb-2">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg bg-axos-bg-surface border border-axos-border-standard text-axos-text-primary text-sm placeholder:text-axos-text-muted focus:outline-none focus:border-axos-accent focus:ring-1 focus:ring-axos-accent/30 transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                {formType === "software" ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-axos-text-primary mb-2">
                        What systems do you use?
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg bg-axos-bg-surface border border-axos-border-standard text-axos-text-primary text-sm placeholder:text-axos-text-muted focus:outline-none focus:border-axos-accent focus:ring-1 focus:ring-axos-accent/30 transition-all resize-none"
                        placeholder="QuickBooks, RentManager, Salesforce..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-axos-text-primary mb-2">
                        What problem are you trying to solve?
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg bg-axos-bg-surface border border-axos-border-standard text-axos-text-primary text-sm placeholder:text-axos-text-muted focus:outline-none focus:border-axos-accent focus:ring-1 focus:ring-axos-accent/30 transition-all resize-none"
                        placeholder="Describe your challenge..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-axos-text-primary mb-2">
                        Budget Range
                      </label>
                      <select className="w-full px-4 py-3 rounded-lg bg-axos-bg-surface border border-axos-border-standard text-axos-text-primary text-sm focus:outline-none focus:border-axos-accent focus:ring-1 focus:ring-axos-accent/30 transition-all appearance-none">
                        <option value="">Select budget</option>
                        <option>Under $10K</option>
                        <option>$10K-50K</option>
                        <option>$50K-100K</option>
                        <option>$100K+</option>
                        <option>Not sure</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-axos-text-primary mb-2">
                        What systems should the Brain connect to?
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg bg-axos-bg-surface border border-axos-border-standard text-axos-text-primary text-sm placeholder:text-axos-text-muted focus:outline-none focus:border-axos-accent focus:ring-1 focus:ring-axos-accent/30 transition-all resize-none"
                        placeholder="QBO, RentManager, CRM, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-axos-text-primary mb-2">
                        What workflows should the Brain handle?
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg bg-axos-bg-surface border border-axos-border-standard text-axos-text-primary text-sm placeholder:text-axos-text-muted focus:outline-none focus:border-axos-accent focus:ring-1 focus:ring-axos-accent/30 transition-all resize-none"
                        placeholder="Process work orders, dispatch vendors, file court papers..."
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-axos-text-primary mb-2">
                          Estimated repetitive hours/week
                        </label>
                        <input
                          type="number"
                          min={0}
                          className="w-full px-4 py-3 rounded-lg bg-axos-bg-surface border border-axos-border-standard text-axos-text-primary text-sm placeholder:text-axos-text-muted focus:outline-none focus:border-axos-accent focus:ring-1 focus:ring-axos-accent/30 transition-all"
                          placeholder="20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-axos-text-primary mb-2">
                          Preferred Deployment
                        </label>
                        <select className="w-full px-4 py-3 rounded-lg bg-axos-bg-surface border border-axos-border-standard text-axos-text-primary text-sm focus:outline-none focus:border-axos-accent focus:ring-1 focus:ring-axos-accent/30 transition-all appearance-none">
                          <option value="">Select option</option>
                          <option>Cloud Concierge</option>
                          <option>On-Premise</option>
                          <option>Sovereignty Operations</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-axos-accent text-white font-medium hover:bg-axos-accent-hover transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-axos-accent-glow/30 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Send size={16} />
                      Submit Request
                    </>
                  )}
                </button>
              </form>
            )}
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection delay={0.2} className="mt-12 text-center">
            <p className="text-sm text-axos-text-muted">
              Or reach us directly at{" "}
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
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
