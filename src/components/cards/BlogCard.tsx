"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export interface BlogItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover?: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  featured?: boolean;
}

export function BlogCard({
  slug,
  title,
  excerpt,
  cover = "/images/blogs/blog-0.jpg",
  category,
  publishedAt,
  readingTime,
}: BlogItem) {
  return (
    <Link
      href={`/blogs/${slug}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-light-surface shadow-lg transition-all duration-500 hover:border-gold/50 hover:shadow-[0_0_35px_rgba(229,169,60,0.18)] dark:border-white/[0.08] dark:bg-[#090D16]"
    >
      {/* 1. Full-Bleed Edge-to-Edge Cover (NO PADDING) */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-950 sm:h-56">
        <Image
          src={cover}
          alt={title}
          fill
          className="group-hover:scale-108 contrast-105 object-cover filter transition-transform duration-700 ease-out"
        />

        {/* Gradient Scrim Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/40 to-transparent" />

        {/* Floating Category & Reading Time Chips */}
        <div className="pointer-events-none absolute left-4 right-4 top-4 z-10 flex items-center justify-between">
          <span className="rounded-full border border-white/15 bg-[#0A0E17]/85 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold shadow-md backdrop-blur-md">
            {category}
          </span>

          <span className="flex items-center gap-1 rounded-full border border-white/10 bg-[#0A0E17]/80 px-2.5 py-1 text-[11px] font-medium text-slate-300 backdrop-blur-md">
            <Clock size={11} className="text-gold" />
            <span>{readingTime}</span>
          </span>
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="flex flex-1 flex-col justify-between space-y-4 p-6 sm:p-7">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Calendar size={12} className="text-gold" />
            <span>{publishedAt}</span>
          </div>

          <h3 className="text-xl font-extrabold leading-snug text-slate-900 transition-colors group-hover:text-gold dark:text-white sm:text-2xl">
            {title}
          </h3>

          <p className="line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
            {excerpt}
          </p>
        </div>

        {/* Bottom Interactive Read Link */}
        <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-xs font-bold text-gold dark:border-white/[0.06]">
          <span className="uppercase tracking-wider">Read Full Essay</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 bg-gold/10 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-gold group-hover:text-slate-950">
            <ArrowRight size={13} />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* Featured Blog Hero Card (Full Bleed & Extra Tall) */
export function FeaturedBlogCard({
  slug,
  title,
  excerpt,
  cover = "/images/blogs/blog-0.jpg",
  category,
  publishedAt,
  readingTime,
}: BlogItem) {
  return (
    <Link
      href={`/blogs/${slug}`}
      className="group relative block overflow-hidden rounded-3xl border border-slate-200 bg-light-surface shadow-2xl transition-all duration-500 hover:border-gold/50 hover:shadow-[0_0_45px_rgba(229,169,60,0.22)] dark:border-white/[0.08] dark:bg-[#090D16]"
    >
      <div className="grid min-h-[440px] grid-cols-1 items-stretch gap-0 sm:min-h-[480px] lg:min-h-[520px] lg:grid-cols-12">
        {/* Full-Bleed Image on Left (Taller & Roomier) */}
        <div className="relative h-72 min-h-[320px] overflow-hidden bg-slate-950 sm:h-96 lg:col-span-5 lg:h-full lg:min-h-[520px]">
          <Image
            src={cover}
            alt={title}
            fill
            priority
            className="group-hover:scale-108 contrast-105 object-cover filter transition-transform duration-700 ease-out"
          />
          {/* Responsive Soft Gradient Overlay */}
          <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-transparent via-transparent to-white/90 opacity-90 dark:to-[#090D16] lg:block lg:bg-gradient-to-r" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent dark:from-[#090D16] lg:hidden" />
        </div>

        {/* Content on Right (Spacious & Prominent) */}
        <div className="flex flex-col justify-between space-y-6 p-8 sm:p-12 lg:col-span-7 lg:p-14">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span className="rounded-full border border-gold/30 bg-gold/15 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gold">
                {category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="text-gold" />
                {publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} className="text-gold" />
                {readingTime}
              </span>
            </div>

            <h2 className="text-3xl font-black leading-[1.2] text-slate-900 transition-colors group-hover:text-gold dark:text-white sm:text-4xl lg:text-5xl">
              {title}
            </h2>

            <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
              {excerpt}
            </p>
          </div>

          <div className="inline-flex items-center gap-2.5 pt-4 text-xs font-extrabold uppercase tracking-wider text-gold transition-transform group-hover:translate-x-2 sm:text-sm">
            <span>READ FEATURED ESSAY</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </Link>
  );
}
