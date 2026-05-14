import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { LazyAnalyticsChart } from "@/components/dashboard/lazy-analytics-chart"
import { MessagesCard } from "@/components/dashboard/messages-card"
import { OverviewCards } from "@/components/dashboard/overview-cards"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { TopReferrers } from "@/components/dashboard/top-referrers"
import { getDashboardData, getSiteData } from "@/lib/data"
import { getI18n, getRequestLocale } from "@/lib/i18n/server"

export async function OverviewScreen() {
  const locale = await getRequestLocale()
  const [dashboard, { siteConfig }, { t }] = await Promise.all([
    getDashboardData(locale),
    getSiteData(locale),
    getI18n(locale, "dashboard"),
  ])
  const quickActionLabels = {
    newProject: t("actions.newProject"),
    writeBlog: t("actions.writeBlog"),
    addBook: t("actions.addBook"),
    newIdea: t("actions.newIdea"),
  }
  const unreadMessages = dashboard.messages.filter((message) => message.unread).length

  return (
    <>
      <DashboardPageHeader
        title={t("overview.title", { name: siteConfig.owner.split(" ")[0] })}
        description={t("overview.description")}
      />
      <div className="space-y-5">
        <OverviewCards stats={dashboard.dashboardStats} />
        <div className="grid gap-5 xl:grid-cols-[1.35fr_0.75fr_1fr]">
          <LazyAnalyticsChart
            data={dashboard.analyticsData}
            labels={{
              title: t("overview.chartTitle"),
              range: t("analytics.range"),
            }}
          />
          <TopReferrers
            items={dashboard.topReferrers}
            title={t("cards.topReferrers")}
          />
          <ActivityFeed
            activities={dashboard.activities}
            title={t("cards.activity")}
          />
        </div>
        <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <QuickActions
            labels={{
              title: t("cards.quickActions"),
              actions: quickActionLabels,
              toasts: {
                newProject: t("actions.mock", {
                  label: quickActionLabels.newProject,
                }),
                writeBlog: t("actions.mock", {
                  label: quickActionLabels.writeBlog,
                }),
                addBook: t("actions.mock", { label: quickActionLabels.addBook }),
                newIdea: t("actions.mock", { label: quickActionLabels.newIdea }),
              },
            }}
          />
          <MessagesCard
            labels={{
              title: t("cards.messages"),
              newCount: t("topbar.newCount", { count: unreadMessages }),
            }}
            messages={dashboard.messages}
          />
        </div>
      </div>
    </>
  )
}
