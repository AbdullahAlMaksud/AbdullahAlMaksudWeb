import type { ReactNode } from "react"
import type { Metadata } from "next"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { getDashboardData, getSiteData } from "@/lib/data"
import { getI18n, getRequestLocale } from "@/lib/i18n/server"
import { requireAdmin } from "@/lib/server-auth"

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n(await getRequestLocale(), "dashboard")
  return {
    title: t("meta.title"),
  }
}

export default async function Layout({ children }: { children: ReactNode }) {
  const locale = await getRequestLocale()
  const currentUser = await requireAdmin()
  const [{ siteConfig }, { notifications }, { t: d }, { t: c }] =
    await Promise.all([
      getSiteData(locale),
      getDashboardData(locale),
      getI18n(locale, "dashboard"),
      getI18n(locale, "common"),
    ])

  return (
    <DashboardShell
      locale={locale}
      notifications={notifications}
      site={siteConfig}
      user={currentUser}
      labels={{
        navigation: d("shell.navigation"),
        viewProfile: d("shell.viewProfile"),
        nav: {
          overview: d("nav.overview"),
          projects: d("nav.projects"),
          blog: d("nav.blog"),
          books: d("nav.books"),
          analytics: d("nav.analytics"),
          messages: d("nav.messages"),
          settings: d("nav.settings"),
        },
        topbar: {
          openSidebar: d("topbar.openSidebar"),
          search: d("topbar.search"),
          notifications: d("topbar.notifications"),
          newCount: d("topbar.newCount", { count: notifications.length }),
          admin: d("topbar.admin"),
          profile: d("topbar.profile"),
          settings: d("topbar.settings"),
          signOut: d("topbar.signOut"),
        },
        language: {
          label: c("language.label"),
          switch: c("language.switch"),
          en: c("language.en"),
          bn: c("language.bn"),
        },
        theme: {
          label: c("theme.label"),
          toggle: c("theme.toggle"),
          light: c("theme.light"),
          sepia: c("theme.sepia"),
          emerald: c("theme.emerald"),
          dark: c("theme.dark"),
          black: c("theme.black"),
          system: c("theme.system"),
        },
      }}
    >
      {children}
    </DashboardShell>
  )
}
