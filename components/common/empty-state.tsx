import type { LucideIcon } from "lucide-react"
import { FileSearch } from "lucide-react"

import { cn } from "@/lib/utils"

export function EmptyState({
  title,
  description,
  icon: Icon = FileSearch,
  className,
}: {
  title: string
  description: string
  icon?: LucideIcon
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/30 p-8 text-center",
        className
      )}
    >
      <div className="mb-4 grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="size-5" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
