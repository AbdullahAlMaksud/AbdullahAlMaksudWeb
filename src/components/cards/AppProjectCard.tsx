"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink, Layers, Sparkles } from "lucide-react";

export interface ProjectItem {
  slug: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  year?: string;
  link?: string;
  github?: string;
  category?: string;
  featured?: boolean;
}

export function AppProjectCard({
  slug,
  title,
  description,
  image = "/images/projects/devtools.jpg",
  tags,
  year = "2025",
  link,
  github,
  category = "Web Application",
  featured,
}: ProjectItem) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-light-surface shadow-lg transition-all duration-500 hover:border-gold/50 hover:shadow-[0_0_35px_rgba(229,169,60,0.18)] dark:border-white/[0.08] dark:bg-[#0A0E17] dark:hover:border-gold/50">
      {/* 1. Full-Bleed Edge-to-Edge Image (NO PADDING) */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-950 sm:h-64">
        <Image
          src={image}
          alt={title}
          fill
          priority={featured}
          className="group-hover:scale-108 contrast-105 object-cover object-top filter transition-transform duration-700 ease-out"
        />

        {/* Gradient Scrim Overlay over Image */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/30 to-transparent" />

        {/* Top Floating Glass Badges */}
        <div className="pointer-events-none absolute left-4 right-4 top-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-[#0A0E17]/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold shadow-md backdrop-blur-md">
            <Layers size={12} />
            <span>{category}</span>
          </div>

          <span className="rounded-full bg-gold/90 px-3 py-1 font-mono text-[11px] font-extrabold tracking-tight text-slate-950 shadow-md">
            {year}
          </span>
        </div>
      </div>

      {/* 2. Content Body */}
      <div className="flex flex-1 flex-col justify-between space-y-4 p-6 sm:p-7">
        <div className="space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl font-extrabold leading-snug text-slate-900 transition-colors group-hover:text-gold dark:text-white sm:text-2xl">
              {title}
            </h3>

            {featured && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[10px] font-bold text-gold">
                <Sparkles size={10} />
                <span>Featured</span>
              </span>
            )}
          </div>

          <p className="line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
            {description}
          </p>
        </div>

        {/* Tech Stack Chips */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-slate-200 bg-light-card/80 px-2.5 py-1 text-[11px] font-medium text-slate-700 dark:border-white/[0.08] dark:bg-[#121826] dark:text-slate-300"
              >
                {tag}
              </span>
            ))}
            {tags.length > 4 && (
              <span className="rounded-lg border border-gold/20 bg-gold/5 px-2 py-1 text-[10px] font-bold text-gold">
                +{tags.length - 4}
              </span>
            )}
          </div>

          {/* Action Links Bar */}
          <div className="flex items-center justify-between border-t border-slate-200 pt-4 dark:border-white/[0.06]">
            {github ? (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 transition-colors hover:text-gold dark:text-slate-400 dark:hover:text-gold"
              >
                <Github size={15} />
                <span>Source Code</span>
              </a>
            ) : (
              <span className="text-[11px] font-semibold text-slate-400">Proprietary</span>
            )}

            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-bold tracking-wider text-slate-950 shadow-md transition-all duration-300 hover:scale-105 hover:bg-gold-light"
              >
                <span>Live Demo</span>
                <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
