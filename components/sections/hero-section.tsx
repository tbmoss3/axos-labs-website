"use client";

import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { GradientMesh } from "@/components/animations/gradient-mesh";

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const meshY = useTransform(scrollY, [0, 800], [0, 160]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <motion.div
        className="absolute inset-0"
        style={{ y: reduceMotion ? 0 : meshY }}
      >
        <GradientMesh />
      </motion.div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="font-serif italic text-axos-accent mb-5 tracking-[0.15em] uppercase text-sm"
            style={{ letterSpacing: "0.2em" }}
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
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[76px] leading-[1.05] mb-7"
            style={{ letterSpacing: "-0.04em" }}
          >
            Own Your Company&#39;s
            <br />
            <span className="font-serif italic text-axos-accent">Intelligence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="text-base sm:text-lg md:text-xl text-axos-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
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
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-axos-accent text-white font-medium hover:bg-axos-accent-hover transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-axos-accent-glow active:translate-y-0 active:shadow-none"
            >
              Contact Us
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-axos-border-standard text-axos-text-primary font-medium hover:bg-axos-bg-elevated/80 hover:border-black/15 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
