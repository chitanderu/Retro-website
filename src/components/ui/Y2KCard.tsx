"use client";

import { motion } from "motion/react";

interface Y2KCardProps {
  children: React.ReactNode;
  className?: string;
  borderStyle?: "dashed" | "dotted" | "double";
  borderColor?: string;
  withHover?: boolean;
}

export default function Y2KCard({
  children,
  className = "",
  borderStyle = "dashed",
  borderColor = "border-secondary/40",
  withHover = true,
}: Y2KCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={withHover ? { y: -2, transition: { duration: 0.2 } } : undefined}
      className={`card relative border-2 border-${borderStyle} ${borderColor} bg-base-200 p-5 ${className}`}
    >
      {children}
    </motion.div>
  );
}
