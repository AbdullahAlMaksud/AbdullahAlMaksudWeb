import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { LazyAnalyticsChart } from "@/components/dashboard/lazy-analytics-chart"
import { MessagesCard } from "@/components/dashboard/messages-card"
import { OverviewCards } from "@/components/dashboard/overview-cards"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { TopReferrers } from "@/components/dashboard/top-referrers"

export function OverviewScreen() {
  return (
    <>
      <DashboardPageHeader
        title="Good evening, Rakibul!"
        description="Here's what's happening with your portfolio."
      />
      <div className="space-y-5">
        <OverviewCards />
        <div className="grid gap-5 xl:grid-cols-[1.35fr_0.75fr_1fr]">
          <LazyAnalyticsChart />
          <TopReferrers />
          <ActivityFeed />
        </div>
        <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <QuickActions />
          <MessagesCard />
        </div>
      </div>
    </>
  )
}
