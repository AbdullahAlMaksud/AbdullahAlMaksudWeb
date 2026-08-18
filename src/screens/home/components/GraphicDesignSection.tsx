"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import designsData from "@/data/designs.json";

export function GraphicDesignSection() {
  const designs = designsData.designs;

  return (
    <section id="designs" className="relative py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Section Header & Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold tracking-widest text-slate-500 dark:text-slate-400">
                GRAPHIC DESIGN
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Visuals that communicate and connect.
            </h2>
          </div>

          <Link
            href="#designs"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-slate-600 dark:text-slate-300 hover:text-gold dark:hover:text-gold transition-colors duration-300 group shrink-0"
          >
            <span>VIEW DESIGNS</span>
            <div className="w-8 h-8 rounded-full border border-slate-300 dark:border-dark-border group-hover:border-gold group-hover:bg-gold group-hover:text-slate-950 flex items-center justify-center transition-all duration-300">
              <ArrowUpRight size={14} />
            </div>
          </Link>
        </div>

        {/* 3 Graphic Design Showcase Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. BYOU - Visual Identity */}
          <div className="group relative rounded-2xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-dark-surface p-4 overflow-hidden card-hover-glow space-y-3">
            <div className="relative h-72 sm:h-80 w-full rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
              <Image
                src="/images/designs/byou.jpg"
                alt="BYOU Visual Identity"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex items-center justify-between px-1 pt-1">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white tracking-wide">
                  BYOU
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Visual Identity
                </p>
              </div>
              <span className="text-[11px] font-medium text-gold bg-gold/10 px-2.5 py-0.5 rounded-full">
                2025
              </span>
            </div>
          </div>

          {/* 2. 88 KNOT - Logo Design */}
          <div className="group relative rounded-2xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-dark-surface p-4 overflow-hidden card-hover-glow space-y-3">
            <div className="relative h-72 sm:h-80 w-full rounded-xl overflow-hidden bg-gradient-to-b from-[#0A0D14] to-[#05070A] flex flex-col items-center justify-center p-6 border border-dark-border/40">
              {/* Geometric 88 Knot Logo Render */}
              <div className="space-y-4 text-center">
                <div className="text-5xl font-black tracking-widest text-slate-100 font-mono">
                  88
                </div>
                <div className="text-xs font-bold tracking-[0.35em] text-slate-400">
                  KNOT
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between px-1 pt-1">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white tracking-wide">
                  88 KNOT
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Logo Design
                </p>
              </div>
              <span className="text-[11px] font-medium text-gold bg-gold/10 px-2.5 py-0.5 rounded-full">
                2025
              </span>
            </div>
          </div>

          {/* 3. NATURE - Poster Design */}
          <div className="group relative rounded-2xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-dark-surface p-4 overflow-hidden card-hover-glow space-y-3">
            <div className="relative h-72 sm:h-80 w-full rounded-xl overflow-hidden bg-gradient-to-b from-[#0F291E] via-[#0A1F16] to-[#06140E] flex flex-col items-center justify-center p-6 border border-emerald-900/30">
              {/* Botanical Nature Graphic Art */}
              <div className="text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                  </svg>
                </div>
                <div className="text-sm font-extrabold tracking-[0.3em] text-emerald-100">
                  NATURE
                </div>
                <p className="text-[10px] text-emerald-300/60 tracking-wider">
                  BOTANICAL EDITORIAL
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between px-1 pt-1">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white tracking-wide">
                  NATURE
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Poster Design
                </p>
              </div>
              <span className="text-[11px] font-medium text-gold bg-gold/10 px-2.5 py-0.5 rounded-full">
                2025
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
