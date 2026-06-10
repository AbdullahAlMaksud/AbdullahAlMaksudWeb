import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { LazyAnalyticsChart } from "@/components/dashboard/lazy-analytics-chart"
import { TopReferrers } from "@/components/dashboard/top-referrers"
import { SpotlightCard } from "@/components/common/spotlight-card"
import { getDashboardData } from "@/lib/data"
import { getI18n, getRequestLocale } from "@/lib/i18n/server"

export async function AnalyticsScreen() {
  const locale = await getRequestLocale()
  const [dashboard, { t }] = await Promise.all([
    getDashboardData(locale),
    getI18n(locale, "dashboard"),
  ])

  return (
    <>
      <DashboardPageHeader
        title={t("analytics.title")}
        description={t("analytics.description")}
      />
      <div className="grid gap-5 xl:grid-cols-[1.4fr_0.8fr]">
        <LazyAnalyticsChart
          data={dashboard.analyticsData}
          labels={{
            title: t("analytics.chartTitle"),
            range: t("analytics.range"),
          }}
        />
        <TopReferrers
          items={dashboard.topReferrers}
          title={t("cards.topReferrers")}
        />
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {dashboard.metrics.map((metric) => (
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
