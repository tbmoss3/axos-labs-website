"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GradientMesh } from "@/components/animations/gradient-mesh";
import { FloatingCard } from "@/components/animations/floating-card";
import { Cpu, Clock, Shield } from "lucide-react";

const stats = [
  { label: "3 Industries Deployed", icon: Cpu },
  { label: "20+ Hours/Week Saved", icon: Clock },
  { label: "100% On-Premise Option", icon: Shield },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <GradientMesh />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-axos-accent font-medium mb-4 tracking-wide uppercase text-sm"
            >
              The Red Hat of Business AI
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-semibold tracking-tight leading-[1.1] mb-6"
              style={{ letterSpacing: "-0.03em" }}
            >
              Hire an AI Employee
              <br />
              <span className="text-axos-text-secondary">That Never Sleeps</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-base sm:text-lg md:text-xl text-axos-text-secondary max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Axos Labs installs persistent AI Brains into your business — on your
              hardware, integrated with your systems, operating under your
              oversight.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-axos-accent text-white font-medium hover:bg-axos-accent-hover transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-axos-accent-glow"
              >
                Request a Brain
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-axos-border-standard text-axos-text-primary font-medium hover:bg-axos-bg-surface transition-all hover:-translate-y-0.5"
              >
                Learn More
              </Link>
            </motion.div>
          </div>

          {/* Right: Floating cards visual */}
          <div className="relative hidden lg:block h-[500px]">
            <FloatingCard
              delay={0}
              className="absolute top-0 right-0 w-72 p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-axos-accent/20 flex items-center justify-center">
                  <Cpu size={16} className="text-axos-accent" />
                </div>
                <span className="text-sm font-medium text-axos-text-primary">
                  Brain Status
                </span>
                <span className="ml-auto text-xs text-axos-success font-medium">
                  Active
                </span>
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-axos-bg-surface rounded-full overflow-hidden">
                  <div className="h-full w-[92%] bg-axos-accent rounded-full" />
                </div>
                <div className="flex justify-between text-xs text-axos-text-muted">
                  <span>Uptime</span>
                  <span>99.7%</span>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard
              delay={0.5}
              className="absolute top-32 left-0 w-64 p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-axos-accent/20 flex items-center justify-center">
                  <Clock size={16} className="text-axos-accent" />
                </div>
                <span className="text-sm font-medium text-axos-text-primary">
                  Time Saved
                </span>
              </div>
              <div className="text-3xl font-semibold text-axos-text-primary mb-1">
                20+ hrs
              </div>
              <div className="text-xs text-axos-text-muted">
                Weekly automation impact
              </div>
            </FloatingCard>

            <FloatingCard
              delay={1}
              className="absolute bottom-12 right-8 w-60 p-5"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-axos-success" />
                  <span className="text-xs text-axos-text-secondary">
                    Work Orders Processed
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-axos-accent" />
                  <span className="text-xs text-axos-text-secondary">
                    Vendor Dispatched
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-axos-accent/50" />
                  <span className="text-xs text-axos-text-secondary">
                    Documents Filed
                  </span>
                </div>
              </div>
            </FloatingCard>
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.6 + i * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="flex items-center gap-4 justify-center sm:justify-start"
            >
              <div className="w-10 h-10 rounded-lg bg-axos-bg-surface border border-axos-border-standard flex items-center justify-center flex-shrink-0">
                <stat.icon size={18} className="text-axos-accent" />
              </div>
              <span className="text-sm font-medium text-axos-text-secondary">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
