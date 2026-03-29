"use client";

import FloatingDecoration from "@/components/decorations/FloatingDecoration";
import Sticker from "@/components/decorations/Sticker";

/* eslint-disable @next/next/no-img-element */

export default function DecorativeOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Top-right corner decorations */}
      <FloatingDecoration
        className="absolute right-8 top-24"
        amplitude={6}
        duration={4}
        delay={0}
      >
        <img src="https://img.yuuki.diy/gameboy.png" alt="" className="w-12 opacity-70" />
      </FloatingDecoration>

      <FloatingDecoration
        className="absolute right-20 top-40"
        amplitude={5}
        duration={3.5}
        delay={0.5}
      >
        <img src="https://img.yuuki.diy/tuoma.png" alt="" className="w-10 opacity-70" />
      </FloatingDecoration>

      {/* Bottom-left decorations */}
      <FloatingDecoration
        className="absolute bottom-20 left-6"
        amplitude={7}
        duration={3}
        delay={1}
      >
        <Sticker type="heart" size="md" />
      </FloatingDecoration>

      <FloatingDecoration
        className="absolute bottom-40 left-16"
        amplitude={5}
        duration={4.5}
        delay={1.5}
      >
        <Sticker type="flower" size="sm" />
      </FloatingDecoration>

      {/* Top-left small accent */}
      <FloatingDecoration
        className="absolute left-4 top-32"
        amplitude={4}
        duration={5}
        delay={2}
      >
        <Sticker type="sparkle" size="sm" />
      </FloatingDecoration>
    </div>
  );
}
