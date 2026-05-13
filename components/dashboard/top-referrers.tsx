import { ExternalLink } from "lucide-react"

import { SpotlightCard } from "@/components/common/spotlight-card"
import { topReferrers } from "@/constants/mock-data"

export function TopReferrers() {
  return (
    <SpotlightCard>
      <div className="p-5">
        <h3 className="font-semibold">Top Referrers</h3>
        <div className="mt-5 space-y-4">
          {topReferrers.map((item) => (
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
