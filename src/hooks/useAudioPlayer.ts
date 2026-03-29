"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type { PlaylistTrack } from "@/types";

interface AudioPlayerState {
  isPlaying: boolean;
  currentTrackIndex: number;
  currentTime: number;
  duration: number;
  currentTrack: PlaylistTrack | null;
}

export function useAudioPlayer(playlist: PlaylistTrack[]) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTrackIndex: 0,
    currentTime: 0,
    duration: 0,
    currentTrack: playlist[0] ?? null,
  });

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    audio.addEventListener("timeupdate", () => {
      setState((prev) => ({ ...prev, currentTime: audio.currentTime }));
    });

    audio.addEventListener("loadedmetadata", () => {
      setState((prev) => ({ ...prev, duration: audio.duration }));
    });

    audio.addEventListener("ended", () => {
      // Auto-advance to next track
      setState((prev) => {
        const nextIndex = (prev.currentTrackIndex + 1) % playlist.length;
        return {
          ...prev,
          currentTrackIndex: nextIndex,
          currentTrack: playlist[nextIndex],
          isPlaying: true,
        };
      });
    });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [playlist]);

  // Load track when index changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !playlist[state.currentTrackIndex]) return;

    const track = playlist[state.currentTrackIndex];
    audio.src = track.src;
    if (state.isPlaying) {
      audio.play().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentTrackIndex, playlist, state.isPlaying]);

  const play = useCallback(() => {
    audioRef.current?.play().catch(() => {});
    setState((prev) => ({ ...prev, isPlaying: true }));
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setState((prev) => ({ ...prev, isPlaying: false }));
  }, []);

  const togglePlay = useCallback(() => {
    if (state.isPlaying) pause();
    else play();
  }, [state.isPlaying, play, pause]);

  const next = useCallback(() => {
    setState((s) => {
      const nextIndex = (s.currentTrackIndex + 1) % playlist.length;
      return {
        ...s,
        currentTrackIndex: nextIndex,
        currentTrack: playlist[nextIndex],
        isPlaying: true,
      };
    });
  }, [playlist]);

  const prev = useCallback(() => {
    setState((s) => {
      const prevIndex =
        (s.currentTrackIndex - 1 + playlist.length) % playlist.length;
      return {
        ...s,
        currentTrackIndex: prevIndex,
        currentTrack: playlist[prevIndex],
        isPlaying: true,
      };
    });
  }, [playlist]);

  return {
    ...state,
    play,
    pause,
    togglePlay,
    next,
    prev,
  };
}
