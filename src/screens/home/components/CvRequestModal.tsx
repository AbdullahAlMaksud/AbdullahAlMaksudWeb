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
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to send. Try again."
      );
    }
  };

  if (!open) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal — stop propagation so clicking inside doesn't close */}
      <div
        className="win relative w-full max-w-md mx-4 bg-cream dark:bg-[#141210] p-0 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Title bar (retro window style) ─────────────────────── */}
        <div className="flex items-center justify-between bg-ink dark:bg-cream px-4 py-2">
          <div className="flex items-center gap-2">
            <Download size={13} className="text-cream dark:text-ink" />
            <span className="font-pixel text-[10px] text-cream dark:text-ink tracking-wider">
              cv_download.exe
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="win w-5 h-5 flex items-center justify-center bg-orange border-orange hover:opacity-80 transition-opacity"
          >
            <X size={10} className="text-cream" />
          </button>
        </div>

        {/* ── Body ────────────────────────────────────────────────── */}
        <div className="p-6">
          {state === "success" ? (
            // ── Success state ──
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <div className="win w-16 h-16 flex items-center justify-center bg-green border-green">
                <Send size={22} className="text-cream" />
              </div>
              <p className="font-pixel text-[13px] text-green leading-6">
                LINK SENT!
              </p>
              <p className="text-[13px] text-ink/70 leading-relaxed">
                Check your inbox —<br />
                the CV download link is on its way.
              </p>
              <button
                onClick={onClose}
                className="mt-2 text-[11px] tracking-widest text-ink/50 hover:text-orange transition-colors underline underline-offset-4"
              >
                CLOSE
              </button>
            </div>
          ) : (
            // ── Form state ──
            <>
              <div className="mb-5">
                <h3 className="font-pixel text-[14px] leading-7 mb-2">
                  GET MY CV
                  <span className="text-orange">.</span>
                </h3>
                <p className="text-[12px] text-ink/60 leading-5">
                  Enter your email and I&apos;ll send you the download link
                  instantly. No spam, ever.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Retro terminal-style input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] tracking-widest text-ink/50">
                    YOUR EMAIL ADDRESS
                  </label>
                  <div className="flex items-center border border-ink/30 bg-cream dark:bg-[#1a1816] focus-within:border-green transition-colors">
                    <span className="px-3 text-orange text-[13px] select-none">
                      &gt;
                    </span>
                    <input
                      id="cv-email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={state === "loading"}
                      placeholder="you@example.com"
                      className="flex-1 bg-transparent py-3 pr-4 text-[13px] outline-none placeholder:text-ink/30 disabled:opacity-50"
                    />
                    <Mail size={13} className="mr-3 text-ink/30" />
                  </div>
                </div>

                {/* Error message */}
                {state === "error" && (
                  <p className="text-[12px] text-red-500 flex items-center gap-1.5">
                    <span>⚠</span> {errorMsg}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={state === "loading"}
                  className="bg-green hover:bg-green-dark text-cream rounded-none text-[12px] py-5 tracking-widest disabled:opacity-60"
                >
                  {state === "loading" ? (
                    <>
                      <Loader2 size={13} className="mr-2 animate-spin" />
                      SENDING...
                    </>
                  ) : (
                    <>
                      SEND ME THE LINK{" "}
                      <Send size={13} className="ml-2" />
                    </>
                  )}
                </Button>

                <p className="text-[11px] text-ink/40 text-center">
                  Press <kbd className="border border-ink/20 px-1">Esc</kbd> to
                  cancel
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
