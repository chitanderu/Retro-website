"use client";

import { motion } from "motion/react";

interface FloatingDecorationProps {
  children: React.ReactNode;
  amplitude?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export default function FloatingDecoration({
  children,
  amplitude = 8,
  duration = 3,
  delay = 0,
  className = "",
}: FloatingDecorationProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -amplitude, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
