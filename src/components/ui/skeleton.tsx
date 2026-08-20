import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shimmer?: boolean;
}

export function Skeleton({ className, shimmer = true, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-slate-200/80 transition-colors duration-300 dark:bg-white/[0.06]",
        shimmer && "shimmer-gold",
        className
      )}
      {...props}
    />
  );
}
