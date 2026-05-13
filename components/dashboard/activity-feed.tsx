import { CircleDot } from "lucide-react"

import { SpotlightCard } from "@/components/common/spotlight-card"
import { activities } from "@/constants/mock-data"
import { cn } from "@/lib/utils"

const tones = {
  violet: "text-primary",
  amber: "text-amber-500",
  emerald: "text-emerald-500",
  rose: "text-rose-500",
}

export function ActivityFeed() {
  return (
    <SpotlightCard>
      <div className="p-5">
        <h3 className="font-semibold">Recent Activity</h3>
        <div className="mt-5 space-y-4">
          {activities.map((item) => (
            <div key={item.id} className="flex gap-3">
              <CircleDot className={cn("mt-1 size-4 shrink-0", tones[item.tone])} />
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SpotlightCard>
  )
}
