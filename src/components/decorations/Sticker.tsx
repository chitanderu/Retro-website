"use client";

import { motion } from "motion/react";

interface StickerProps {
  type?: "star" | "heart" | "flower" | "sparkle";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const stickerEmoji = {
  star: "⭐",
  heart: "💗",
  flower: "🌸",
  sparkle: "✨",
};

const sizeMap = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-3xl",
};

export default function Sticker({
  type = "star",
  size = "md",
  className = "",
}: StickerProps) {
  const randomRotation = Math.random() * 10 - 5;

  return (
    <motion.span
      className={`pointer-events-none select-none ${sizeMap[size]} ${className}`}
      style={{ display: "inline-block", transform: `rotate(${randomRotation}deg)` }}
      whileHover={{ scale: 1.3, rotate: randomRotation + 15 }}
      animate={{
        y: [0, -3, 0],
      }}
      transition={{
        y: { duration: 2 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {stickerEmoji[type]}
    </motion.span>
  );
}
