"use client";

import { useState, useEffect } from "react";
import { X, Download, Send, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CvRequestModalProps {
  open: boolean;
  onClose: () => void;
}

type State = "idle" | "loading" | "success" | "error";

export function CvRequestModal({ open, onClose }: CvRequestModalProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Reset on open
  useEffect(() => {
    if (open) {
      setEmail("");
      setState("idle");
      setErrorMsg("");
    }
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/cv-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? "Something went wrong");
      }

      setState("success");
    } catch (err: unknown) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send. Try again.");
    }
  };

  if (!open) return null;

  return (
    // Backdrop
    <div
      className="bg-ink/60 fixed inset-0 z-[200] flex items-center justify-center backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal — stop propagation so clicking inside doesn't close */}
      <div
        className="win bg-cream relative mx-4 w-full max-w-md p-0 duration-150 animate-in fade-in zoom-in-95 dark:bg-[#141210]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Title bar (retro window style) ─────────────────────── */}
        <div className="bg-ink dark:bg-cream flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            <Download size={13} className="text-cream dark:text-ink" />
            <span className="font-pixel text-cream dark:text-ink text-[10px] tracking-wider">
              cv_download.exe
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="win bg-orange border-orange flex h-5 w-5 items-center justify-center transition-opacity hover:opacity-80"
          >
            <X size={10} className="text-cream" />
          </button>
        </div>

        {/* ── Body ────────────────────────────────────────────────── */}
        <div className="p-6">
          {state === "success" ? (
            // ── Success state ──
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <div className="win bg-green border-green flex h-16 w-16 items-center justify-center">
                <Send size={22} className="text-cream" />
              </div>
              <p className="font-pixel text-green text-[13px] leading-6">LINK SENT!</p>
              <p className="text-ink/70 text-[13px] leading-relaxed">
                Check your inbox —<br />
                the CV download link is on its way.
              </p>
              <button
                onClick={onClose}
                className="text-ink/50 hover:text-orange mt-2 text-[11px] tracking-widest underline underline-offset-4 transition-colors"
              >
                CLOSE
              </button>
            </div>
          ) : (
            // ── Form state ──
            <>
              <div className="mb-5">
                <h3 className="font-pixel mb-2 text-[14px] leading-7">
                  GET MY CV
                  <span className="text-orange">.</span>
                </h3>
                <p className="text-ink/60 text-[12px] leading-5">
                  Enter your email and I&apos;ll send you the download link instantly. No spam,
                  ever.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Retro terminal-style input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-ink/50 text-[11px] tracking-widest">
                    YOUR EMAIL ADDRESS
                  </label>
                  <div className="border-ink/30 bg-cream focus-within:border-green flex items-center border transition-colors dark:bg-[#1a1816]">
                    <span className="text-orange select-none px-3 text-[13px]">&gt;</span>
                    <input
                      id="cv-email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={state === "loading"}
                      placeholder="you@example.com"
                      className="placeholder:text-ink/30 flex-1 bg-transparent py-3 pr-4 text-[13px] outline-none disabled:opacity-50"
                    />
                    <Mail size={13} className="text-ink/30 mr-3" />
                  </div>
                </div>

                {/* Error message */}
                {state === "error" && (
                  <p className="flex items-center gap-1.5 text-[12px] text-red-500">
                    <span>⚠</span> {errorMsg}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={state === "loading"}
                  className="bg-green hover:bg-green-dark text-cream rounded-none py-5 text-[12px] tracking-widest disabled:opacity-60"
                >
                  {state === "loading" ? (
                    <>
                      <Loader2 size={13} className="mr-2 animate-spin" />
                      SENDING...
                    </>
                  ) : (
                    <>
                      SEND ME THE LINK <Send size={13} className="ml-2" />
                    </>
                  )}
                </Button>

                <p className="text-ink/40 text-center text-[11px]">
                  Press <kbd className="border-ink/20 border px-1">Esc</kbd> to cancel
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
