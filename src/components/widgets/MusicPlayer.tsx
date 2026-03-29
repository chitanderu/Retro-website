"use client";

import { motion } from "motion/react";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { playlist } from "@/lib/playlist";

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function MusicPlayer() {
  const {
    isPlaying,
    currentTrack,
    currentTime,
    duration,
    togglePlay,
    next,
    prev,
  } = useAudioPlayer(playlist);

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="card relative overflow-hidden border-2 border-dashed border-neutral/30 bg-gradient-to-b from-base-300 to-base-200"
    >
      {/* iPod Body */}
      <div className="p-3">
        {/* LCD Screen */}
        <div className="rounded-lg border border-base-content/10 bg-base-100 p-3 shadow-inner">
          {/* Track Info */}
          <p className="font-pixel text-[10px] text-base-content/40">
            ♪ Now Playing
          </p>
          <p className="truncate font-pixel text-sm text-base-content">
            {currentTrack?.title ?? "No track"}
          </p>
          <p className="truncate font-pixel text-xs text-base-content/50">
            {currentTrack?.artist ?? "—"}
          </p>

          {/* Progress Bar */}
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-base-300">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Time */}
          <div className="mt-1 flex justify-between font-pixel text-[10px] text-base-content/40">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Click Wheel */}
        <div className="mx-auto mt-3 flex h-28 w-28 items-center justify-center rounded-full border border-base-content/10 bg-base-300 shadow-inner">
          {/* Directional buttons around center */}
          <div className="relative flex h-full w-full items-center justify-center">
            {/* Top - Menu */}
            <button
              className="absolute top-2 font-pixel text-[8px] text-base-content/40 transition-colors hover:text-base-content/70"
              aria-label="Menu"
            >
              MENU
            </button>

            {/* Left - Previous */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="absolute left-2 text-base-content/50 transition-colors hover:text-base-content/80"
              aria-label="Previous track"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </motion.button>

            {/* Right - Next */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="absolute right-2 text-base-content/50 transition-colors hover:text-base-content/80"
              aria-label="Next track"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </motion.button>

            {/* Bottom - placeholder */}
            <button
              className="absolute bottom-2 font-pixel text-[8px] text-base-content/40 transition-colors hover:text-base-content/70"
              aria-label="Playlist"
            >
              ☰
            </button>

            {/* Center - Play/Pause */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-base-100 shadow-sm transition-colors hover:bg-base-200"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-base-content/70">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-base-content/70">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
