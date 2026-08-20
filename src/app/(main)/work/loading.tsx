import { Skeleton } from "@/components/ui/skeleton";
import { ProjectCardSkeleton, GraphicCardSkeleton } from "@/components/skeletons/CardSkeletons";
import { BookDetailSkeleton } from "@/components/skeletons/SectionSkeletons";

export default function WorkLoading() {
  return (
    <main className="min-h-screen bg-light-bg text-slate-900 dark:bg-dark-bg dark:text-white">
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-28 sm:px-10">
        {/* Breadcrumb Skeleton */}
        <Skeleton className="mb-12 h-4 w-28 rounded" />

        {/* Page Header Skeleton */}
        <header className="mb-16 space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-2 w-2 rounded-full bg-gold" />
            <Skeleton className="h-4 w-20 rounded" />
          </div>

          <Skeleton className="h-12 w-3/5 rounded-2xl sm:h-14" />
          <Skeleton className="h-4 max-w-xl rounded" />

          {/* Quick Sub-navigation Pills Skeletons */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <Skeleton className="h-9 w-36 rounded-full" />
            <Skeleton className="h-9 w-36 rounded-full" />
            <Skeleton className="h-9 w-40 rounded-full" />
          </div>
        </header>

        {/* Section 01: Applications */}
        <section className="mb-24 space-y-8">
          <div className="flex justify-between border-b border-slate-200 pb-4 dark:border-white/10">
            <div className="space-y-2">
              <Skeleton className="h-3 w-20 rounded bg-gold/20" />
              <Skeleton className="h-8 w-64 rounded-lg" />
            </div>
            <Skeleton className="h-4 w-32 rounded" />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
          </div>
        </section>

        {/* Section 02: Graphic Design */}
        <section className="mb-24 space-y-8">
          <div className="flex justify-between border-b border-slate-200 pb-4 dark:border-white/10">
            <div className="space-y-2">
              <Skeleton className="h-3 w-20 rounded bg-gold/20" />
              <Skeleton className="h-8 w-56 rounded-lg" />
            </div>
            <Skeleton className="h-4 w-32 rounded" />
          </div>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            <GraphicCardSkeleton />
            <GraphicCardSkeleton />
            <GraphicCardSkeleton />
          </div>
        </section>
      </div>
    </main>
  );
}
