"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  floatIntensity?: number;
}

export function FloatingCard({
  children,
  className = "",
  delay = 0,
  floatIntensity = 1,
}: FloatingCardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.015] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(0,0,0,0.2)] backdrop-blur-sm",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: [0, -12 * floatIntensity, 0] }}
      transition={{
        opacity: { duration: 0.6, delay },
        y: { duration: 6 + floatIntensity * 2, repeat: Infinity, ease: "easeInOut", delay: delay + 0.6 },
      }}
    >
      {children}
    </motion.div>
  );
}
