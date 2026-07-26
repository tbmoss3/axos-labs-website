"use client";

import { motion } from "framer-motion";
import { CSSProperties } from "react";

interface RevealHeadingProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

// Section heading that reveals word-by-word from behind a mask on scroll.
export function RevealHeading({ text, className = "", style }: RevealHeadingProps) {
  const words = text.split(" ");
  return (
    <motion.h2
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06 } },
      }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden>
          <span className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "110%", opacity: 0.01 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </motion.h2>
  );
}
