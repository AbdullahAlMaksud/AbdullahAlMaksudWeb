import { Skeleton } from "@/components/ui/skeleton";
import { ProjectCardSkeleton } from "@/components/skeletons/CardSkeletons";

export default function ProjectsLoading() {
  return (
    <main className="min-h-screen bg-light-bg text-slate-900 dark:bg-dark-bg dark:text-white">
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-28 sm:px-10">
        {/* Breadcrumb Skeleton */}
        <Skeleton className="mb-12 h-4 w-32 rounded" />

        {/* Header Skeleton */}
        <header className="mb-14 space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-2 w-2 rounded-full bg-gold" />
            <Skeleton className="h-4 w-36 rounded" />
          </div>

          <Skeleton className="h-12 w-3/5 rounded-2xl sm:h-14" />
          <Skeleton className="h-4 max-w-xl rounded" />
        </header>

        {/* Projects Grid Skeleton */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
