"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";

// Placeholder gallery items
const galleryItems = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: `Work ${i + 1}`,
  color: [
    "bg-primary/20",
    "bg-secondary/20",
    "bg-accent/20",
    "bg-neutral/20",
    "bg-primary/30",
    "bg-secondary/30",
    "bg-accent/30",
    "bg-neutral/30",
  ][i],
}));

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-8">
      <SectionHeading icon="✦">Gallery</SectionHeading>

      <p className="text-sm text-base-content/60">
        A collection of my work and creations ✿
      </p>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {galleryItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelected(item.id)}
            className={`aspect-square rounded-box border-2 border-dashed border-secondary/20 ${item.color} flex items-center justify-center transition-colors hover:border-secondary/50`}
          >
            <span className="font-[family-name:var(--font-pixel-mplus)] text-sm text-base-content/40">
              {item.title}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-base-content/50 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="card w-full max-w-lg border-2 border-dashed border-secondary/40 bg-base-100 p-6"
            >
              <div className="aspect-video rounded-lg bg-base-200 flex items-center justify-center">
                <span className="font-[family-name:var(--font-pixel-mplus)] text-lg text-base-content/30">
                  Work {selected}
                </span>
              </div>
              <div className="mt-4 flex justify-between">
                <p className="font-[family-name:var(--font-pixel-mplus)] text-sm text-base-content">
                  Work {selected}
                </p>
                <button
                  onClick={() => setSelected(null)}
                  className="btn btn-ghost btn-sm font-[family-name:var(--font-pixel-mplus)] text-xs"
                >
                  Close ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
