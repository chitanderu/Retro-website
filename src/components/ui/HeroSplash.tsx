"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function HeroSplash() {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-black"
          onClick={() => setVisible(false)}
        >
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          >
            <source
              src="https://img.yuuki.diy/eru-chitanda-hyouka-wallpaperwaifu-com.mp4"
              type="video/mp4"
            />
          </video>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative z-10 flex flex-col items-center gap-6"
          >
            <h1 className="font-pixel text-6xl tracking-widest text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] sm:text-8xl">
              HYOUKA
            </h1>
            <p className="font-pixel text-sm tracking-wider text-white/60">
              氷菓 ― わたし、気になります！
            </p>
            <motion.p
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-8 font-pixel text-xs text-white/40"
            >
              Click anywhere to enter
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
