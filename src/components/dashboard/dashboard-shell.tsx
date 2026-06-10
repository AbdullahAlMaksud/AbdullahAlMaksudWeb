"use client"

import * as React from "react"

import type { LanguageSwitcherLabels } from "@/components/common/language-switcher"
import type { ThemeToggleLabels } from "@/components/common/theme-toggle"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardTopbar } from "@/components/dashboard/dashboard-topbar"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import type { Locale } from "@/lib/i18n/resources"
import type { AuthUser } from "@/lib/server-auth"
import type { Notification, SiteConfig } from "@/types/content"

export type DashboardShellLabels = {
  navigation: string
  viewProfile: string
  nav: Record<
    "overview" | "projects" | "blog" | "books" | "analytics" | "messages" | "settings",
    string
  >
  topbar: {
    openSidebar: string
    search: string
    notifications: string
    newCount: string
    admin: string
    profile: string
    settings: string
    signOut: string
  }
  language: LanguageSwitcherLabels
  theme: ThemeToggleLabels
}

export function DashboardShell({
  children,
  locale,
  labels,
  notifications,
  site,
  user,
}: {
  children: React.ReactNode
  locale: Locale
  labels: DashboardShellLabels
  notifications: Notification[]
  site: SiteConfig
  user: AuthUser
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <div className="relative z-10 flex min-h-svh bg-background">
      <div className="hidden shrink-0 lg:block">
        <DashboardSidebar labels={labels} site={site} />
      </div>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[84vw] p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>{labels.navigation}</SheetTitle>
          </SheetHeader>
          <DashboardSidebar
            labels={labels}
            mobile
            onNavigate={() => setMobileOpen(false)}
            site={site}
          />
        </SheetContent>
      </Sheet>
      <div className="min-w-0 flex-1">
        <DashboardTopbar
          labels={labels}
          locale={locale}
          notifications={notifications}
          onMenu={() => setMobileOpen(true)}
          site={site}
          user={user}
        />
        <main className="mx-auto w-full max-w-7xl px-4 py-6 lg:px-6">
          {children}
        </main>
      </div>
    </div>
  )
}
