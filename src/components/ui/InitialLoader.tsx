"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface InitialLoaderProps {
  label?: string;
  sublabel?: string;
  fullscreen?: boolean;
}

export function InitialLoader({
  label = "ABDULLAH AL MAKSUD",
  sublabel = "Crafting digital experiences...",
  fullscreen = true,
}: InitialLoaderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center bg-light-bg transition-colors duration-500 dark:bg-[#07090D] ${
        fullscreen
          ? "fixed inset-0 z-[9999] min-h-screen w-screen backdrop-blur-2xl"
          : "min-h-[400px] w-full py-20"
      }`}
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-gold/15 blur-[100px] dark:bg-gold/10" />

      <div className="relative z-10 flex flex-col items-center space-y-6">
        {/* Animated Brand Emblem */}
        <div className="relative flex h-24 w-24 items-center justify-center">
          {/* Outer Dashed Orbit */}
          <div className="absolute inset-0 animate-spin rounded-full border border-dashed border-gold/40 [animation-duration:10s]" />

          {/* Glowing Ring */}
          <div className="absolute inset-2 animate-pulse rounded-full border border-gold/60 shadow-[0_0_25px_rgba(229,169,60,0.3)] [animation-duration:2.5s]" />

          {/* Central Monogram Core */}
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/50 bg-white/90 shadow-xl backdrop-blur-xl dark:border-gold/40 dark:bg-[#0C1018]/90">
            <span className="font-mono text-xl font-black tracking-tighter text-gold">AM</span>
          </div>

          {/* Sparkle Floating Indicator */}
          <div className="absolute -right-1 -top-1 animate-bounce text-gold [animation-duration:2s]">
            <Sparkles size={16} />
          </div>
        </div>

        {/* Brand Text & Status */}
        <div className="space-y-2 text-center">
          <h2 className="text-xs font-black tracking-[0.3em] text-slate-800 dark:text-slate-200">
            {label}
          </h2>

          <div className="flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-gold" />
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{sublabel}</p>
          </div>
        </div>

        {/* Animated Loading Bar Pill */}
        <div className="h-1 w-36 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
          <div className="h-full w-full origin-left animate-[shimmerWave_1.5s_infinite_ease-in-out] bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>
      </div>
    </div>
  );
}

/**
 * Hook or Wrapper for initial session loader
 */
export function SessionPreloader() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Hide after initial mount
    const timer = setTimeout(() => {
      setVisible(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[99999] transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <InitialLoader fullscreen />
    </div>
  );
}
