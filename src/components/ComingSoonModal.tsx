"use client";

import { useEffect } from "react";
import { X, Clock, Zap } from "lucide-react";

interface ComingSoonModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
}

export function ComingSoonModal({ open, onClose, title }: ComingSoonModalProps) {
  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="win relative w-full max-w-sm mx-4 bg-cream dark:bg-[#141210] p-0 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Title bar ──────────────────────────────────────────── */}
        <div className="flex items-center justify-between bg-ink dark:bg-cream px-4 py-2">
          <div className="flex items-center gap-2">
            <Clock size={12} className="text-cream dark:text-ink" />
            <span className="font-pixel text-[9px] text-cream dark:text-ink tracking-wider">
              coming_soon.exe
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="win w-5 h-5 flex items-center justify-center bg-orange border-orange hover:opacity-80 transition-opacity"
          >
            <X size={10} className="text-cream" />
          </button>
        </div>

        {/* ── Body ────────────────────────────────────────────────── */}
        <div className="p-6 text-center">
          {/* Icon */}
          <div className="win w-16 h-16 flex items-center justify-center bg-orange border-orange mx-auto mb-5">
            <Zap size={24} className="text-cream" />
          </div>

          {/* Pixel heading */}
          <p className="font-pixel text-[12px] leading-7 mb-2">
            COMING SOON<span className="text-orange">.</span>
          </p>

          {/* Title of what's coming */}
          {title && (
            <p className="text-[12px] text-ink/50 dark:text-cream/40 mb-4 tracking-wide">
              &ldquo;{title}&rdquo;
            </p>
          )}

          {/* Terminal blink message */}
          <div className="bg-ink dark:bg-[#0d0c09] px-4 py-3 mb-5 text-left">
            <p className="font-mono text-[12px] text-green leading-6">
              <span className="text-orange">$</span> status --check
            </p>
            <p className="font-mono text-[11px] text-cream/60 leading-6">
              Page under construction...
              <span className="inline-block w-1.5 h-3.5 bg-green ml-1 align-middle animate-pulse" />
            </p>
          </div>

          <p className="text-[12px] text-ink/60 dark:text-cream/50 leading-relaxed mb-5">
            This page is being crafted with care. Check back soon — it&apos;ll
            be worth the wait.
          </p>

          <button
            onClick={onClose}
            className="w-full bg-ink dark:bg-cream text-cream dark:text-ink text-[11px] tracking-widest py-3 hover:bg-green hover:border-green transition-colors border border-ink dark:border-cream"
          >
            OK, I&apos;LL WAIT
          </button>

          <p className="text-[10px] text-ink/30 dark:text-cream/20 mt-3">
            Press <kbd className="border border-ink/20 px-1 text-[9px]">Esc</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
}
