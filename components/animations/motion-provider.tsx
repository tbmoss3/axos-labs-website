"use client";

import { MotionConfig } from "framer-motion";
import { ReactNode } from "react";

// Honors the OS-level "reduce motion" setting for every framer-motion
// animation in the app.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
