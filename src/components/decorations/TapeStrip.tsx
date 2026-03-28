"use client";

import { motion } from "motion/react";

interface TapeStripProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  rotation?: number;
  color?: "primary" | "secondary" | "accent";
  className?: string;
}

const positionStyles = {
  "top-left": "-top-2 -left-3",
  "top-right": "-top-2 -right-3",
  "bottom-left": "-bottom-2 -left-3",
  "bottom-right": "-bottom-2 -right-3",
};

const colorStyles = {
  primary: "bg-primary/40",
  secondary: "bg-secondary/40",
  accent: "bg-accent/40",
};

export default function TapeStrip({
  position = "top-left",
  rotation = -12,
  color = "secondary",
  className = "",
}: TapeStripProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={`pointer-events-none absolute ${positionStyles[position]} z-10 ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div
        className={`h-4 w-16 ${colorStyles[color]} rounded-sm shadow-sm`}
        style={{
          background: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.3) 2px,
            rgba(255,255,255,0.3) 4px
          ), var(--fallback-sc, oklch(var(--sc)))`,
          opacity: 0.4,
        }}
      />
    </motion.div>
  );
}
