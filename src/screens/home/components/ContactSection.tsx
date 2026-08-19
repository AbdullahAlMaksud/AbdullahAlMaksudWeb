"use client";

import { useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { useHomeQuery } from "@/services";
import { ContactDrawer } from "./ContactDrawer";

const DEFAULT_CONTACT = {
  headlineLines: ["Let's create", "something", "meaningful", "together."],
  highlightIndex: 2,
  ctaText: "GET IN TOUCH",
  email: "contact@abdullahalmaksud.com",
};

export function ContactSection() {
  const { data: serverHomeData } = useHomeQuery();
  const contact = serverHomeData?.contact || DEFAULT_CONTACT;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div id="contact" className="flex scroll-mt-28 justify-end pt-10 [perspective:1000px]">
      <div
        onClick={() => setIsDrawerOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setIsDrawerOpen(true);
          }
        }}
        className="group relative flex min-h-[460px] w-full max-w-[350px] transform cursor-pointer flex-col justify-between rounded-[32px] border border-slate-200 bg-gradient-to-b from-white via-slate-50 to-slate-100 px-8 pb-9 pt-16 shadow-[0_30px_70px_rgba(0,0,0,0.1)] transition-all duration-500 dark:border-white/15 dark:bg-gradient-to-b dark:from-[#121824]/95 dark:via-[#0E131C]/95 dark:to-[#080B10]/95 dark:shadow-[0_30px_70px_rgba(0,0,0,0.95)] sm:min-h-[500px] sm:max-w-[370px] sm:px-9 sm:pb-10 sm:pt-20 lg:[transform:rotateY(-11deg)_rotateX(7deg)_rotateZ(2deg)] hover:lg:[transform:rotateY(-2deg)_rotateX(1deg)_rotateZ(0deg)]"
      >
        {/* Subtle Ambient Gold Glow */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full bg-gold/10 blur-3xl transition-colors duration-500 group-hover:bg-gold/20" />

        {/* Overlapping Absolute Mail Icon Badge */}
        <div className="absolute -top-8 left-8 z-20 flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-[0_14px_30px_rgba(0,0,0,0.95)] transition-transform duration-500 group-hover:scale-110 dark:border-white/20 dark:bg-[#161C28] dark:text-white sm:left-9">
          <Mail size={26} />
        </div>

        {/* Headline with Large, Crisp Typography */}
        <div className="my-auto space-y-1">
          <h2 className="text-3xl font-light leading-[1.18] tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[38px]">
            {contact.headlineLines.map((line, idx) => {
              if (idx === contact.highlightIndex) {
                return (
                  <span key={idx}>
                    <span className="font-normal text-gold">{line}</span>
                    <br />
                  </span>
                );
              }
              return (
                <span key={idx}>
                  {line}
                  {idx !== contact.headlineLines.length - 1 && <br />}
                </span>
              );
            })}
          </h2>
        </div>

        {/* Bottom CTA Action */}
        <div className="flex items-center justify-between pt-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-300 sm:text-[13px]">
            {contact.ctaText}
          </span>
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/70 text-gold shadow-[0_0_15px_rgba(229,169,60,0.25)] transition-all duration-300 group-hover:scale-105 group-hover:border-gold group-hover:bg-gold group-hover:text-slate-950"
            aria-label="Send email"
          >
            <ArrowUpRight size={17} />
          </div>
        </div>
      </div>

      <ContactDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
}
