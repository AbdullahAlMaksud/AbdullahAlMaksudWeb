"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Sparkles, ShoppingBag } from "lucide-react";

export interface BookItem {
  titleBn: string;
  titleEn: string;
  author: string;
  publisher: string;
  category: string;
  ageGroup?: string;
  price: number;
  year: number;
  rokomariUrl: string;
  cover?: string;
  descriptionBn: string;
  descriptionEn?: string;
}

export function BookShowcaseCard({
  titleBn,
  titleEn,
  author,
  publisher,
  category,
  price,
  year,
  rokomariUrl,
  cover = "/images/books/emon-jodi-hoto.webp",
  descriptionBn,
  descriptionEn,
}: BookItem) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-light-surface via-light-card to-light-surface shadow-xl transition-all duration-500 hover:border-gold/50 hover:shadow-[0_0_40px_rgba(229,169,60,0.2)] dark:border-white/[0.08] dark:from-[#0B0F19] dark:via-[#0F1422] dark:to-[#090C14]">
      {/* Background Ambient Gold Halo */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-gold/10 blur-[100px]" />

      <div className="relative z-10 grid grid-cols-1 items-center gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-12">
        {/* Left Column: Full-Bleed Book Cover with 3D Depth */}
        <div className="flex justify-center lg:col-span-5">
          <div className="group/book relative">
            {/* Gold Glow Behind Book */}
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-tr from-gold/35 via-gold/10 to-transparent opacity-60 blur-xl transition-opacity group-hover/book:opacity-100" />

            {/* Book Cover Container (NO Inner Padding) */}
            <div className="relative aspect-[2/3] w-56 overflow-hidden rounded-2xl border border-amber-500/25 bg-slate-950 shadow-[0_20px_50px_rgba(0,0,0,0.4)] sm:w-64">
              <Image
                src={cover}
                alt={titleBn}
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover/book:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Right Column: Literary Details & Metadata */}
        <div className="space-y-6 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold">
              <BookOpen size={12} />
              <span>Published Book</span>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1 font-mono text-[11px] font-bold text-slate-700 dark:bg-white/10 dark:text-slate-300">
              {year}
            </span>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-3xl font-black leading-tight text-slate-900 transition-colors group-hover:text-gold dark:text-white sm:text-4xl">
              {titleBn}{" "}
              <span className="block text-lg font-medium text-slate-400 dark:text-slate-400 sm:inline sm:text-xl">
                ({titleEn})
              </span>
            </h3>
            <p className="text-xs font-bold uppercase tracking-widest text-gold">By {author}</p>
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
            {descriptionEn || descriptionBn}
          </p>

          {/* Quick Facts Strip */}
          <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-light-card p-3 dark:border-white/[0.08] dark:bg-[#121724]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Publisher
              </p>
              <p className="mt-0.5 truncate text-xs font-bold text-slate-900 dark:text-white sm:text-sm">
                {publisher}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-light-card p-3 dark:border-white/[0.08] dark:bg-[#121724]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Category
              </p>
              <p className="mt-0.5 truncate text-xs font-bold text-slate-900 dark:text-white sm:text-sm">
                {category}
              </p>
            </div>

            <div className="col-span-2 rounded-xl border border-slate-200 bg-light-card p-3 dark:border-white/[0.08] dark:bg-[#121724] sm:col-span-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Price
              </p>
              <p className="mt-0.5 text-xs font-extrabold text-gold sm:text-sm">৳ {price} BDT</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <a
              href={rokomariUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-gold px-7 py-3.5 text-xs font-bold tracking-wider text-slate-950 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gold-light"
            >
              <ShoppingBag size={14} />
              <span>BUY ON ROKOMARI</span>
              <ArrowUpRight size={14} />
            </a>

            <Link
              href="/work/books"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-light-card px-6 py-3.5 text-xs font-bold tracking-wider text-slate-800 transition-all duration-300 hover:border-gold dark:border-white/15 dark:bg-[#121724] dark:text-white dark:hover:border-gold"
            >
              <span>VIEW BOOK PAGE</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
