"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { GradientMesh } from "@/components/animations/gradient-mesh";
import { FloatingCard } from "@/components/animations/floating-card";
import { CountUp } from "@/components/animations/count-up";
import { Cpu, Clock, Shield } from "lucide-react";

const stats = [
  { value: 3, suffix: "", label: "Industries Deployed", icon: Cpu },
  { value: 20, suffix: "+", label: "Hours/Week Saved", icon: Clock },
  { value: 100, suffix: "%", label: "On-Premise Option", icon: Shield },
];

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const meshY = useTransform(scrollY, [0, 800], [0, 160]);
  const cardsY = useTransform(scrollY, [0, 800], [0, -60]);

  // Live activity ticker — the Brain never sleeps.
  const [workOrders, setWorkOrders] = useState(1284);
  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(
      () => setWorkOrders((n) => n + 1),
      3500 + Math.random() * 2500
    );
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <motion.div
        className="absolute inset-0"
        style={{ y: reduceMotion ? 0 : meshY }}
      >
        <GradientMesh />
      </motion.div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-axos-accent font-semibold mb-5 tracking-[0.15em] uppercase text-xs"
              style={{ letterSpacing: "0.2em" }}
            >
              The Red Hat of Business AI
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-semibold leading-[1.05] mb-7"
              style={{ letterSpacing: "-0.04em" }}
            >
              Hire an AI Employee
              <br />
              <span className="text-axos-text-secondary">
                That Never Sleeps
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-base sm:text-lg text-axos-text-secondary max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
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
                delay: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-axos-accent text-white font-medium hover:bg-axos-accent-hover transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-axos-accent-glow active:translate-y-0 active:shadow-none"
              >
                Request a Brain
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-axos-border-standard text-axos-text-primary font-medium hover:bg-axos-bg-surface/80 hover:border-white/15 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                Learn More
              </Link>
            </motion.div>
          </div>

          {/* Right: Floating cards visual */}
          <motion.div
            className="relative hidden lg:block h-[500px]"
            style={{ y: reduceMotion ? 0 : cardsY }}
          >
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
                  <CountUp value={99.7} decimals={1} suffix="%" />
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
                <CountUp value={20} suffix="+ hrs" />
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
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inline-flex w-full h-full rounded-full bg-axos-success opacity-60 animate-ping" />
                    <span className="relative inline-flex w-2 h-2 rounded-full bg-axos-success" />
                  </span>
                  <span className="text-xs text-axos-text-secondary">
                    Work Orders Processed
                  </span>
                  <span className="ml-auto text-xs font-medium text-axos-text-primary tabular-nums">
                    {workOrders.toLocaleString("en-US")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-axos-accent" />
                  <span className="text-xs text-axos-text-secondary">
                    Vendors Dispatched
                  </span>
                  <span className="ml-auto text-xs font-medium text-axos-text-primary tabular-nums">
                    312
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-axos-accent/50" />
                  <span className="text-xs text-axos-text-secondary">
                    Documents Filed
                  </span>
                  <span className="ml-auto text-xs font-medium text-axos-text-primary tabular-nums">
                    4,096
                  </span>
                </div>
              </div>
            </FloatingCard>
          </motion.div>
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
                <CountUp value={stat.value} suffix={stat.suffix} />{" "}
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
