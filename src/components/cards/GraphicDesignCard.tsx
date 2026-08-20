"use client";

import Image from "next/image";
import { Palette, Eye, Sparkles } from "lucide-react";
import { getImageUrl } from "@/lib/image";

export interface GraphicDesignItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  tools: string[];
  year: string;
  category?: string;
}

export function GraphicDesignCard({
  title,
  subtitle,
  description,
  coverImage = "/images/portrait.png",
  tools,
  year,
  category = "Brand Identity",
}: GraphicDesignItem) {
  return (
    <div className="group relative flex h-[440px] flex-col justify-end overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-xl transition-all duration-500 hover:border-gold/60 hover:shadow-[0_0_35px_rgba(229,169,60,0.22)] dark:border-white/[0.08] sm:h-[480px]">
      {/* 1. Full-Bleed Edge-to-Edge Artwork (NO PADDING) */}
      <Image
        src={getImageUrl(coverImage)}
        alt={title}
        fill
        className="group-hover:scale-108 contrast-105 object-cover object-center filter transition-transform duration-700 ease-out"
      />

      {/* 2. Multi-Stop Gradient Scrim Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060911] via-[#060911]/75 to-transparent opacity-90 transition-opacity group-hover:opacity-95" />

      {/* 3. Top Floating Glass Tags */}
      <div className="pointer-events-none absolute left-4 right-4 top-4 z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-[#0A0E17]/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold shadow-md backdrop-blur-md">
          <Palette size={12} />
          <span>{category}</span>
        </div>

        <span className="rounded-full bg-gold px-3 py-1 font-mono text-[11px] font-extrabold tracking-tight text-slate-950 shadow-md">
          {year}
        </span>
      </div>

      {/* 4. Bottom Info Overlay */}
      <div className="relative z-10 space-y-3 p-6 sm:p-7">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-gold">{subtitle}</p>
          <h3 className="text-2xl font-black leading-tight text-white transition-colors group-hover:text-gold">
            {title}
          </h3>
        </div>

        <p className="line-clamp-2 text-xs leading-relaxed text-slate-300 opacity-90 transition-opacity group-hover:opacity-100 sm:text-sm">
          {description}
        </p>

        {/* Tools Used */}
        <div className="flex flex-wrap items-center gap-1.5 border-t border-white/10 pt-2">
          {tools.map((tool) => (
            <span
              key={tool}
              className="rounded-md border border-white/15 bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-slate-200 backdrop-blur-md"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
