import { ExternalLink } from "lucide-react"

import { SpotlightCard } from "@/components/common/spotlight-card"
import type { TopReferrer } from "@/types/content"

export function TopReferrers({
  items,
  title,
}: {
  items: TopReferrer[]
  title: string
}) {
  return (
    <SpotlightCard>
      <div className="p-5">
        <h3 className="font-semibold">{title}</h3>
        <div className="mt-5 space-y-4">
          {items.map((item) => (
            <div key={item.source} className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 text-sm">
                <ExternalLink className="size-4 text-primary" />
                {item.source}
              </span>
              <span className="font-mono text-sm text-muted-foreground">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SpotlightCard>
  )
}
