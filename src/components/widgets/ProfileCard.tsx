"use client";

import { motion } from "motion/react";
import TapeStrip from "@/components/decorations/TapeStrip";

export default function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card relative border-2 border-dashed border-secondary/40 bg-base-200 p-4"
    >
      <TapeStrip position="top-right" rotation={15} color="primary" />

      <div className="flex flex-col items-center gap-3">
        {/* Avatar */}
        <div className="h-20 w-20 rounded-full border-2 border-dotted border-secondary/50 bg-base-300 p-1">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/20 font-[family-name:var(--font-pixel-mplus)] text-2xl">
            ✧
          </div>
        </div>

        {/* Name */}
        <div className="text-center">
          <h3 className="font-[family-name:var(--font-pixel-mplus)] text-base text-base-content">
            古典部
          </h3>
          <p className="font-[family-name:var(--font-pixel-mplus)] text-xs text-base-content/50">
            Classics Club
          </p>
        </div>

        {/* Bio */}
        <p className="text-center text-xs text-base-content/60">
          神山高校古典部の活動記録 ✿
        </p>

        {/* Status */}
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-success" />
          <span className="font-[family-name:var(--font-pixel-mplus)] text-xs text-base-content/50">
            活動中
          </span>
        </div>

        {/* Tags */}
        <div className="flex gap-2">
          {["京アニ", "推理"].map((name) => (
            <span
              key={name}
              className="badge badge-outline badge-sm font-[family-name:var(--font-pixel-mplus)] text-xs"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
