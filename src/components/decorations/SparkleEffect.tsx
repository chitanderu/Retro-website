"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

interface SparkleEffectProps {
  count?: number;
  className?: string;
}

export default function SparkleEffect({
  count = 6,
  className = "",
}: SparkleEffectProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const generated: Sparkle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 8 + Math.random() * 12,
      delay: Math.random() * 3,
    }));
    setSparkles(generated);
  }, [count]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.svg
            key={sparkle.id}
            className="absolute text-warning/60"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              width: sparkle.size,
              height: sparkle.size,
            }}
            viewBox="0 0 24 24"
            fill="currentColor"
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 180],
            }}
            transition={{
              duration: 2,
              delay: sparkle.delay,
              repeat: Infinity,
              repeatDelay: 1 + Math.random() * 3,
            }}
          >
            <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
          </motion.svg>
        ))}
      </AnimatePresence>
    </div>
  );
}
