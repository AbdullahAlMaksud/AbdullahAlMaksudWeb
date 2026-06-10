import { BookOpen, FolderKanban, Mail, Newspaper } from "lucide-react"

import { SpotlightCard } from "@/components/common/spotlight-card"
import { cn } from "@/lib/utils"
import type { DashboardStat } from "@/types/content"

const icons = [FolderKanban, Newspaper, BookOpen, Mail]
const tones = {
  violet: "bg-primary/10 text-primary",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  rose: "bg-rose-500/10 text-rose-600 dark:text-rose-300",
}

export function OverviewCards({ stats }: { stats: DashboardStat[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = icons[index]
        return (
          <SpotlightCard key={stat.label}>
            <div className="flex items-center gap-4 p-5">
              <span className={cn("grid size-12 place-items-center rounded-2xl", tones[stat.tone])}>
                <Icon className="size-5" />
              </span>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-2xl font-semibold">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.delta}</p>
              </div>
            </div>
          </SpotlightCard>
        )
      })}
    </div>
  )
}
