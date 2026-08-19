"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactDrawer({ isOpen, onClose }: ContactDrawerProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setTimeout(() => {
          onClose();
          setStatus("idle");
          setFormData({ name: "", email: "", message: "" });
        }, 3000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm dark:bg-black/60"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="pointer-events-none fixed bottom-0 left-0 right-0 z-[101] flex max-h-[90vh] justify-center"
          >
            <div className="pb-safe pointer-events-auto w-full overflow-y-auto rounded-t-[32px] border-x border-t border-slate-200 bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.1)] dark:border-white/10 dark:bg-[#0A0D14] dark:shadow-[0_-20px_50px_rgba(0,0,0,0.5)] md:max-w-xl">
              <div className="p-6 sm:p-8">
                {/* Drag handle pill */}
                <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-slate-200 dark:bg-white/10" />

                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Get in Touch
                    </h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Let&apos;s build something great together.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5"
                  >
                    <X size={20} />
                  </button>
                </div>

                {status === "success" ? (
                  <div className="space-y-4 py-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                      <Send size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Message Sent!
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      I&apos;ll get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 pb-6">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-gold focus:ring-1 focus:ring-gold dark:border-white/10 dark:bg-[#0E131C] dark:text-white dark:placeholder:text-slate-600"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-gold focus:ring-1 focus:ring-gold dark:border-white/10 dark:bg-[#0E131C] dark:text-white dark:placeholder:text-slate-600"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-gold focus:ring-1 focus:ring-gold dark:border-white/10 dark:bg-[#0E131C] dark:text-white dark:placeholder:text-slate-600"
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-sm text-red-500">
                        Something went wrong. Please try again.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gold py-3.5 font-bold tracking-wide text-slate-950 transition-colors hover:bg-gold/90 disabled:opacity-70"
                    >
                      {status === "loading" ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <>
                          Send Message
                          <Send size={16} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
