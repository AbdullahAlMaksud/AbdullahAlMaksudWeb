import type { ReactNode } from "react"

import { VerticalNavbar } from "@/components/marketing/vertical-navbar"
import AnimatedBackground from "@/components/common/animated-background"
import { getSiteData } from "@/lib/data"
import { getI18n, getRequestLocale } from "@/lib/i18n/server"
import { fetchApi } from "@/lib/api"
import type { PortfolioProject } from "@/types/content"

export default async function MarketingLayout({
  children,
}: {
  children: ReactNode
}) {
  const locale = await getRequestLocale()
  const [{ marketingNav }, { t }] = await Promise.all([
    getSiteData(locale),
    getI18n(locale, "common"),
  ])

  let projects: PortfolioProject[] = []
  try {
    projects = await fetchApi<PortfolioProject[]>("/api/v1/projects")
  } catch (error) {
    console.error("Failed to fetch projects for navbar:", error)
  }

  // Filter out archived projects for public rendering
  const activeProjects = projects.filter((p) => !p.isArchived)

  return (
    <div className="relative isolate min-h-svh overflow-hidden">
      <AnimatedBackground />
      <VerticalNavbar
        locale={locale}
        nav={marketingNav}
        projects={activeProjects}
        labels={{
          pin: t("nav.pin"),
          unpin: t("nav.unpin"),
          theme: t("theme.label"),
          light: t("theme.light"),
          sepia: t("theme.sepia"),
          emerald: t("theme.emerald"),
          dark: t("theme.dark"),
          black: t("theme.black"),
          system: t("theme.system"),
          language: t("language.label"),
          fullscreen: t("nav.fullscreen"),
          exitFullscreen: t("nav.exitFullscreen"),
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
