import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { LazyAnalyticsChart } from "@/components/dashboard/lazy-analytics-chart"
import { TopReferrers } from "@/components/dashboard/top-referrers"
import { SpotlightCard } from "@/components/common/spotlight-card"

const metrics = [
  { label: "Avg. read depth", value: "68%" },
  { label: "Newsletter clicks", value: "412" },
  { label: "Project demo views", value: "1.8k" },
]

export function AnalyticsScreen() {
  return (
    <>
      <DashboardPageHeader
        title="Analytics"
        description="Mock portfolio analytics for traffic, reading, and conversion signals."
      />
      <div className="grid gap-5 xl:grid-cols-[1.4fr_0.8fr]">
        <LazyAnalyticsChart title="Traffic and reading trends" />
        <TopReferrers />
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {metrics.map((metric) => (
          <SpotlightCard key={metric.label}>
            <div className="p-5">
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className="mt-2 text-3xl font-semibold">{metric.value}</p>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </>
  )
}
