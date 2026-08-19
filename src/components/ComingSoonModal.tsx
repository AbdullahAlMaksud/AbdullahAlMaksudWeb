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
      className="bg-ink/60 fixed inset-0 z-[200] flex items-center justify-center backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="win bg-cream relative mx-4 w-full max-w-sm p-0 duration-150 animate-in fade-in zoom-in-95 dark:bg-[#141210]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Title bar ──────────────────────────────────────────── */}
        <div className="bg-ink dark:bg-cream flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            <Clock size={12} className="text-cream dark:text-ink" />
            <span className="font-pixel text-cream dark:text-ink text-[9px] tracking-wider">
              coming_soon.exe
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="win bg-orange border-orange flex h-5 w-5 items-center justify-center transition-opacity hover:opacity-80"
          >
            <X size={10} className="text-cream" />
          </button>
        </div>

        {/* ── Body ────────────────────────────────────────────────── */}
        <div className="p-6 text-center">
          {/* Icon */}
          <div className="win bg-orange border-orange mx-auto mb-5 flex h-16 w-16 items-center justify-center">
            <Zap size={24} className="text-cream" />
          </div>

          {/* Pixel heading */}
          <p className="font-pixel mb-2 text-[12px] leading-7">
            COMING SOON<span className="text-orange">.</span>
          </p>

          {/* Title of what's coming */}
          {title && (
            <p className="text-ink/50 dark:text-cream/40 mb-4 text-[12px] tracking-wide">
              &ldquo;{title}&rdquo;
            </p>
          )}

          {/* Terminal blink message */}
          <div className="bg-ink mb-5 px-4 py-3 text-left dark:bg-[#0d0c09]">
            <p className="text-green font-mono text-[12px] leading-6">
              <span className="text-orange">$</span> status --check
            </p>
            <p className="text-cream/60 font-mono text-[11px] leading-6">
              Page under construction...
              <span className="bg-green ml-1 inline-block h-3.5 w-1.5 animate-pulse align-middle" />
            </p>
          </div>

          <p className="text-ink/60 dark:text-cream/50 mb-5 text-[12px] leading-relaxed">
            This page is being crafted with care. Check back soon — it&apos;ll be worth the wait.
          </p>

          <button
            onClick={onClose}
            className="bg-ink dark:bg-cream text-cream dark:text-ink hover:bg-green hover:border-green border-ink dark:border-cream w-full border py-3 text-[11px] tracking-widest transition-colors"
          >
            OK, I&apos;LL WAIT
          </button>

          <p className="text-ink/30 dark:text-cream/20 mt-3 text-[10px]">
            Press <kbd className="border-ink/20 border px-1 text-[9px]">Esc</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
}
