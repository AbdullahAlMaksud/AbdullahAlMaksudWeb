import { Skeleton } from "@/components/ui/skeleton";
import { BookDetailSkeleton } from "@/components/skeletons/SectionSkeletons";

export default function BookLoading() {
  return (
    <main className="min-h-screen bg-light-bg text-slate-900 dark:bg-dark-bg dark:text-white">
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-28 sm:px-10">
        {/* Breadcrumb Skeleton */}
        <Skeleton className="mb-12 h-4 w-32 rounded" />

        {/* Book Details Skeleton */}
        <BookDetailSkeleton />
      </div>
    </main>
  );
}
