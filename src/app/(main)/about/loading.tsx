import { Skeleton } from "@/components/ui/skeleton";

export default function AboutLoading() {
  return (
    <main className="min-h-screen bg-light-bg text-slate-900 dark:bg-[#07090D] dark:text-white">
      <div className="mx-auto max-w-6xl space-y-24 px-6 pb-24 pt-28 sm:space-y-32 sm:px-10 sm:pt-32">
        {/* Breadcrumb Skeleton */}
        <Skeleton className="h-4 w-24 rounded" />

        {/* Section 1: Hero */}
        <section className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Portrait Card Skeleton */}
          <div className="h-full min-h-[480px] w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-200/90 dark:border-dark-border dark:bg-[#0A0D15] sm:min-h-[540px] lg:col-span-5">
            <Skeleton className="h-full w-full rounded-none" />
          </div>

          {/* Right Column: Bio & Badges Skeleton */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-7">
            <div className="flex items-center gap-2">
              <Skeleton className="h-2 w-2 rounded-full bg-gold" />
              <Skeleton className="h-3.5 w-24 rounded" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-10 w-full rounded-xl sm:h-12" />
              <Skeleton className="h-10 w-4/5 rounded-xl sm:h-12" />
              <Skeleton className="h-10 w-2/3 rounded-xl sm:h-12" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-3/4 rounded" />
            </div>

            {/* Signature Skeleton */}
            <Skeleton className="h-10 w-36 rounded-lg bg-gold/15" />

            {/* 4 Info Badges Skeleton */}
            <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-light-surface p-3 dark:border-dark-border dark:bg-[#0C1018]"
                >
                  <Skeleton className="h-8 w-8 shrink-0 rounded-lg bg-gold/20" />
                  <Skeleton className="h-4 w-32 rounded" />
                </div>
              ))}
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Skeleton className="h-12 w-44 rounded-full bg-gold/30" />
              <Skeleton className="h-12 w-40 rounded-full" />
            </div>
          </div>
        </section>

        {/* Section 2: What I Do Skeletons */}
        <section className="space-y-10">
          <div className="space-y-2 border-b border-slate-200 pb-4 dark:border-dark-border">
            <Skeleton className="h-3 w-28 rounded bg-gold/20" />
            <Skeleton className="h-8 w-48 rounded-lg" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="space-y-5 rounded-3xl border border-slate-200 bg-light-surface p-6 dark:border-dark-border dark:bg-[#0C1018]"
              >
                <div className="flex items-center justify-between">
                  <Skeleton className="h-12 w-12 rounded-2xl bg-gold/20" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-6 w-3/4 rounded" />
                <div className="space-y-1.5">
                  <Skeleton className="h-3.5 w-full rounded" />
                  <Skeleton className="h-3.5 w-4/5 rounded" />
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  <Skeleton className="h-5 w-14 rounded" />
                  <Skeleton className="h-5 w-16 rounded" />
                  <Skeleton className="h-5 w-12 rounded" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
