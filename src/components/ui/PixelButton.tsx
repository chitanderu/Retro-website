"use client";

import { motion } from "motion/react";

interface PixelButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "accent" | "neutral";
  className?: string;
}

const variantMap = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  accent: "btn-accent",
  neutral: "btn-neutral",
};

export default function PixelButton({
  children,
  onClick,
  variant = "primary",
  className = "",
}: PixelButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`btn ${variantMap[variant]} font-[family-name:var(--font-pixel-mplus)] text-sm shadow-[2px_2px_0_0_rgba(0,0,0,0.1)] ${className}`}
    >
      {children}
    </motion.button>
  );
}
