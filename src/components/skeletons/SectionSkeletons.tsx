"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { BookCardSkeleton } from "./CardSkeletons";

/**
 * Skeleton for Featured Projects 3D-Tilted Swiper on Home Screen
 */
export function FeaturedProjectsSkeleton() {
  return (
    <div className="relative scroll-mt-28 space-y-6 [perspective:1400px]">
      {/* 3D Tilted Card Container Skeleton */}
      <div className="relative w-full max-w-[500px] transform transition-all duration-500 lg:[transform:rotate(-5.5deg)_rotateY(-5deg)_rotateX(3deg)]">
        <div className="space-y-5 rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-lg backdrop-blur-xl dark:border-white/20 dark:bg-[#0C1018]/95 sm:p-7">
          {/* Mockup Screen Skeleton */}
          <div className="relative flex h-52 w-full items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-[#080B10] sm:h-60">
            <Skeleton className="h-full w-full rounded-none" />
          </div>

          {/* Project Details Skeletons */}
          <div className="flex items-start justify-between gap-4 pt-1">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-3/4 rounded-lg" />
              <div className="space-y-1.5 pt-1">
                <Skeleton className="h-3.5 w-full rounded" />
                <Skeleton className="h-3.5 w-4/5 rounded" />
              </div>
            </div>

            {/* Circular button skeleton */}
            <Skeleton className="h-10 w-10 shrink-0 rounded-full bg-gold/20" />
          </div>

          {/* Tech Stack Pills Skeletons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex max-w-[500px] items-center justify-between px-1 pt-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-2.5 w-2.5 rounded-full bg-gold/50" />
          <Skeleton className="h-px w-4" />
          <Skeleton className="h-2.5 w-2.5 rounded-full" />
          <Skeleton className="h-px w-4" />
          <Skeleton className="h-2.5 w-2.5 rounded-full" />
        </div>
        <Skeleton className="h-3 w-28 rounded" />
      </div>
    </div>
  );
}

/**
 * Skeleton for Books Section on Home Screen
 */
export function BooksSectionSkeleton() {
  return (
    <div className="space-y-6 pt-4 [perspective:1200px]">
      <div className="grid grid-cols-3 gap-3.5 pt-3 sm:gap-5">
        <BookCardSkeleton />
        <BookCardSkeleton />
        <BookCardSkeleton />
      </div>
    </div>
  );
}

/**
 * Skeleton for Graphic Design Section on Home Screen
 */
export function GraphicDesignSectionSkeleton() {
  return (
    <div className="space-y-6 [perspective:1200px] lg:pl-10 xl:pl-16">
      <div className="transform space-y-6 transition-transform duration-500 lg:[transform:rotateY(-9deg)_rotateX(5deg)_rotateZ(0.5deg)]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="relative h-60 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-[#0A0D14] sm:h-64">
                <Skeleton className="h-full w-full rounded-none" />
              </div>
              <Skeleton className="mx-auto h-3 w-16 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for Writing Section on Home Screen
 */
export function WritingSectionSkeleton() {
  return (
    <div className="space-y-6 pt-4 [perspective:1200px]">
      <div className="transform divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-xl backdrop-blur-xl dark:divide-white/[0.06] dark:border-white/10 dark:bg-[#0C1018]/90 sm:p-7 lg:[transform:rotateY(-6deg)_rotateX(3deg)]">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-4 py-4 first:pt-1 last:pb-1"
          >
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-4/5 rounded-md" />
              <Skeleton className="h-3 w-20 rounded" />
            </div>
            <Skeleton className="h-8 w-8 shrink-0 rounded-full bg-slate-200 dark:bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton for Book Details Page (/work/books)
 */
export function BookDetailSkeleton() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex justify-center lg:col-span-5">
          <div className="relative aspect-[2/3] w-[270px] overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 shadow-2xl dark:border-white/10 sm:w-[320px]">
            <Skeleton className="h-full w-full rounded-none" />
          </div>
        </div>

        <div className="space-y-6 lg:col-span-7">
          <div className="flex items-center gap-2">
            <Skeleton className="h-2 w-2 rounded-full bg-gold" />
            <Skeleton className="h-3.5 w-36 rounded" />
          </div>

          <Skeleton className="h-10 w-4/5 rounded-xl" />
          <Skeleton className="h-4 w-32 rounded bg-gold/20" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-3/4 rounded" />
          </div>

          {/* Author Badge Skeleton */}
          <div className="flex max-w-md items-center gap-3 rounded-2xl border border-slate-200 bg-light-surface p-4 dark:border-white/10 dark:bg-[#0C1018]">
            <Skeleton className="h-10 w-10 shrink-0 rounded-xl bg-gold/20" />
            <div className="space-y-1.5">
              <Skeleton className="h-2.5 w-20 rounded" />
              <Skeleton className="h-4 w-32 rounded" />
            </div>
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Skeleton className="h-12 w-48 rounded-full bg-gold/30" />
            <Skeleton className="h-12 w-32 rounded-full" />
          </div>
        </div>
      </div>

      {/* Facts Grid Skeleton */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="space-y-2 rounded-2xl border border-slate-200 bg-light-surface p-5 shadow-sm dark:border-white/10 dark:bg-[#0C1018]"
          >
            <Skeleton className="h-3 w-16 rounded" />
            <Skeleton className="h-5 w-28 rounded" />
          </div>
        ))}
      </div>

      {/* Quote Block Skeleton */}
      <div className="space-y-4 rounded-3xl border border-slate-200 bg-light-surface p-8 dark:border-white/10 dark:bg-[#0E131E] sm:p-12">
        <Skeleton className="h-6 w-8 rounded" />
        <Skeleton className="h-6 w-full rounded" />
        <Skeleton className="h-6 w-3/4 rounded" />
        <Skeleton className="h-4 w-36 rounded bg-gold/20" />
      </div>
    </div>
  );
}
