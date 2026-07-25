"use client";

import { ReactNode } from "react";
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
    <div
      className={cn(
        "relative rounded-xl border border-axos-border-standard bg-axos-bg-elevated/80 backdrop-blur-sm shadow-xl",
        className
      )}
      style={{
        animation: `float ${6 + floatIntensity * 2}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      {children}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotateX(0deg) rotateY(0deg);
          }
          50% {
            transform: translateY(-12px) rotateX(2deg) rotateY(-1deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          div {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
