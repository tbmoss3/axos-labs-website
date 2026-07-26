"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

// Vertical beam that draws itself as it scrolls into view — connective
// tissue between sections so the dark gaps read as one continuous page.
export function SectionBeam() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "end 55%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dotOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  return (
    <div ref={ref} aria-hidden className="relative h-20 md:h-32 overflow-hidden">
      <motion.div
        style={{ scaleY: reduceMotion ? 1 : scaleY }}
        className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-px origin-top bg-gradient-to-b from-transparent via-axos-accent/30 to-axos-accent/60"
      />
      <motion.div
        style={{ opacity: reduceMotion ? 1 : dotOpacity }}
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-1.5 h-1.5 rounded-full bg-axos-accent shadow-[0_0_12px_rgba(124,58,237,0.8)]"
      />
    </div>
  );
}
