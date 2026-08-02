"use client";

import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { GradientMesh } from "@/components/animations/gradient-mesh";
import { DashboardPreview } from "@/components/graphics/dashboard-preview";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const meshY = useTransform(scrollY, [0, 800], [0, 160]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <motion.div
        className="absolute inset-0"
        style={{ y: reduceMotion ? 0 : meshY }}
      >
        <GradientMesh />
      </motion.div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-axos-text-muted text-sm mb-6 tracking-wide uppercase"
            >
              Persistent AI Brains for Business
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.02] mb-8"
              style={{ letterSpacing: "-0.03em" }}
            >
              Own Your
              <br />
              Company&#39;s{" "}
              <em className="text-axos-accent">Intelligence</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-base sm:text-lg text-axos-text-secondary leading-relaxed mb-10"
            >
              Axos Labs deploys both custom and open-source software to fully
              integrate your business&#39;s intelligence into one AI-native
              platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-axos-accent text-white text-sm font-medium hover:bg-axos-accent-hover transition-colors"
              >
                Contact Us
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-axos-border-standard text-axos-text-primary text-sm font-medium hover:bg-axos-bg-elevated/80 transition-colors"
              >
                Learn More
              </Link>
            </motion.div>
          </div>

          {/* Right: Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="hidden lg:block"
          >
            <DashboardPreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
