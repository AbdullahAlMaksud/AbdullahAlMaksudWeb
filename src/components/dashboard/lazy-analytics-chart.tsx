"use client"

import dynamic from "next/dynamic"

import { SpotlightCard } from "@/components/common/spotlight-card"
import type { ChartPoint } from "@/types/content"

const Chart = dynamic(
  () => import("@/components/dashboard/analytics-chart").then((mod) => mod.AnalyticsChart),
  {
    ssr: false,
    loading: () => (
      <SpotlightCard className="min-h-[320px]">
        <div className="p-5">
          <div className="mb-5">
            <div className="h-5 w-32 rounded-full bg-muted" />
            <div className="mt-2 h-4 w-24 rounded-full bg-muted/70" />
          </div>
          <div className="h-64 rounded-2xl bg-muted/50" />
        </div>
      </SpotlightCard>
    ),
  }
)

export function LazyAnalyticsChart({
  data,
  labels,
}: {
  data: ChartPoint[]
  labels: {
    title: string
    range: string
  }
}) {
  return <Chart data={data} labels={labels} />
}
