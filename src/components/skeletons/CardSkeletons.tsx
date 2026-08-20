"use client";

import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton for standard Project Cards (AppProjectCard)
 */
export function ProjectCardSkeleton() {
  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-light-surface shadow-lg dark:border-white/[0.08] dark:bg-[#0A0E17]">
      {/* 1. Full-Bleed Image Frame Skeleton */}
      <div className="relative h-56 w-full bg-slate-200/90 dark:bg-[#121824] sm:h-64">
        <Skeleton className="h-full w-full rounded-none" />

        {/* Floating Tag Badges Skeletons */}
        <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
          <Skeleton className="h-6 w-28 rounded-full bg-slate-300/80 dark:bg-white/10" />
          <Skeleton className="h-6 w-12 rounded-full bg-gold/20 dark:bg-gold/20" />
        </div>
      </div>

      {/* 2. Content Body Skeleton */}
      <div className="flex flex-1 flex-col justify-between space-y-5 p-6 sm:p-7">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <Skeleton className="h-7 w-3/4 rounded-lg" />
            <Skeleton className="h-5 w-16 rounded-full bg-gold/15" />
          </div>

          <div className="space-y-1.5 pt-1">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-5/6 rounded" />
          </div>
        </div>

        {/* Tech Stack Chips Skeletons */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-wrap gap-1.5">
            <Skeleton className="h-6 w-16 rounded-lg" />
            <Skeleton className="h-6 w-20 rounded-lg" />
            <Skeleton className="h-6 w-14 rounded-lg" />
            <Skeleton className="w-18 h-6 rounded-lg" />
          </div>

          {/* Action Links Bar Skeleton */}
          <div className="flex items-center justify-between border-t border-slate-200 pt-4 dark:border-white/[0.06]">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-8 w-28 rounded-full bg-gold/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for Graphic Design Cards (GraphicDesignCard)
 */
export function GraphicCardSkeleton() {
  return (
    <div className="relative flex h-[440px] flex-col justify-end overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 shadow-xl dark:border-white/[0.08] sm:h-[480px]">
      {/* Background Frame Skeleton */}
      <Skeleton className="absolute inset-0 h-full w-full rounded-none bg-slate-200/90 dark:bg-[#0A0D15]" />

      {/* Floating Glass Tags Skeletons */}
      <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between">
        <Skeleton className="h-6 w-28 rounded-full bg-slate-300/80 dark:bg-white/10" />
        <Skeleton className="h-6 w-12 rounded-full bg-gold/20" />
      </div>

      {/* Bottom Info Overlay Skeleton */}
      <div className="relative z-10 space-y-3 p-6 sm:p-7">
        <Skeleton className="h-3 w-20 rounded bg-gold/25" />
        <Skeleton className="h-7 w-4/5 rounded" />

        <div className="space-y-1.5 pt-1">
          <Skeleton className="h-3.5 w-full rounded" />
          <Skeleton className="h-3.5 w-2/3 rounded" />
        </div>

        {/* Tools Skeletons */}
        <div className="flex flex-wrap items-center gap-1.5 border-t border-white/10 pt-3">
          <Skeleton className="h-5 w-14 rounded-md bg-white/10" />
          <Skeleton className="h-5 w-16 rounded-md bg-white/10" />
          <Skeleton className="h-5 w-12 rounded-md bg-white/10" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for 3D Book on Shelf
 */
export function BookCardSkeleton() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative z-10 h-44 w-full overflow-hidden rounded-xl border border-slate-200 bg-light-card shadow-lg dark:border-white/10 dark:bg-[#121824] sm:h-60 sm:rounded-2xl">
        <Skeleton className="h-full w-full rounded-none" />
        <div className="absolute inset-x-4 top-6 space-y-2">
          <Skeleton className="h-3 w-16 rounded bg-gold/20" />
          <Skeleton className="h-4 w-24 rounded" />
        </div>
      </div>

      {/* Shadow */}
      <div className="pointer-events-none z-10 -mt-1 h-2.5 w-4/5 rounded-full bg-black/40 blur-[4px] dark:bg-black/90" />

      {/* Floor Reflection Skeleton */}
      <div className="pointer-events-none relative -mt-1 h-16 w-full scale-y-[-1] overflow-hidden opacity-25 blur-[2.5px] sm:h-24">
        <Skeleton className="h-full w-full rounded-none" />
      </div>
    </div>
  );
}

/**
 * Skeleton for Blog Article Cards (BlogCard)
 */
export function BlogCardSkeleton() {
  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-light-surface shadow-lg dark:border-white/[0.08] dark:bg-[#090D16]">
      {/* Cover Image Skeleton */}
      <div className="relative h-52 w-full bg-slate-200/90 dark:bg-[#121824] sm:h-56">
        <Skeleton className="h-full w-full rounded-none" />

        {/* Floating Category & Clock Skeletons */}
        <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between">
          <Skeleton className="h-6 w-24 rounded-full bg-slate-300/80 dark:bg-white/10" />
          <Skeleton className="h-6 w-20 rounded-full bg-slate-300/80 dark:bg-white/10" />
        </div>
      </div>

      {/* Content Section Skeleton */}
      <div className="flex flex-1 flex-col justify-between space-y-4 p-6 sm:p-7">
        <div className="space-y-2.5">
          <Skeleton className="h-3 w-20 rounded" />
          <Skeleton className="h-6 w-11/12 rounded" />
          <Skeleton className="h-6 w-3/4 rounded" />

          <div className="space-y-1.5 pt-1">
            <Skeleton className="h-3.5 w-full rounded" />
            <Skeleton className="h-3.5 w-4/5 rounded" />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 pt-4 dark:border-white/[0.06]">
          <Skeleton className="h-4 w-28 rounded bg-gold/20" />
          <Skeleton className="h-8 w-8 rounded-full bg-gold/15" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for Featured Hero Blog Card
 */
export function FeaturedBlogCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-light-surface shadow-2xl dark:border-white/[0.08] dark:bg-[#090D16]">
      <div className="grid min-h-[440px] grid-cols-1 items-stretch gap-0 sm:min-h-[480px] lg:min-h-[520px] lg:grid-cols-12">
        {/* Left Image Skeleton */}
        <div className="relative h-72 min-h-[320px] bg-slate-200/90 dark:bg-[#121824] sm:h-96 lg:col-span-5 lg:h-full lg:min-h-[520px]">
          <Skeleton className="h-full w-full rounded-none" />
        </div>

        {/* Right Content Skeleton */}
        <div className="flex flex-col justify-between space-y-6 p-8 sm:p-12 lg:col-span-7 lg:p-14">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Skeleton className="h-7 w-28 rounded-full bg-gold/20" />
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-4 w-20 rounded" />
            </div>

            <div className="space-y-2.5">
              <Skeleton className="h-10 w-full rounded-xl" />
              <Skeleton className="h-10 w-4/5 rounded-xl" />
            </div>

            <div className="space-y-2 pt-2">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-2/3 rounded" />
            </div>
          </div>

          <div className="pt-4">
            <Skeleton className="h-5 w-44 rounded bg-gold/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
