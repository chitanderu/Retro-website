"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";

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
  const [randomRotation, setRandomRotation] = useState(0);
  const [animDuration, setAnimDuration] = useState(3);

  useEffect(() => {
    setRandomRotation(Math.random() * 10 - 5);
    setAnimDuration(2 + Math.random() * 2);
  }, []);

  return (
    <motion.span
      className={`pointer-events-none select-none ${sizeMap[size]} ${className}`}
      style={{ display: "inline-block", transform: `rotate(${randomRotation}deg)` }}
      whileHover={{ scale: 1.3, rotate: randomRotation + 15 }}
      animate={{
        y: [0, -3, 0],
      }}
      transition={{
        y: { duration: animDuration, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {stickerEmoji[type]}
    </motion.span>
  );
}