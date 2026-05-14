import type { ReactNode } from "react"

import { ScrollProgress } from "@/components/common/scroll-progress"
import { SiteNavbar } from "@/components/marketing/site-navbar"
import { getSiteData } from "@/lib/data"
import { getI18n, getRequestLocale } from "@/lib/i18n/server"

export default async function MarketingLayout({
  children,
}: {
  children: ReactNode
}) {
  const locale = await getRequestLocale()
  const [{ siteConfig, marketingNav }, { t }] = await Promise.all([
    getSiteData(locale),
    getI18n(locale, "common"),
  ])

  return (
    <div className="relative z-10 min-h-svh">
      <ScrollProgress />
      <SiteNavbar
        locale={locale}
        nav={marketingNav}
        siteName={siteConfig.name}
        labels={{
          contact: t("nav.contact"),
          openDashboard: t("nav.openDashboard"),
          openMenu: t("nav.openMenu"),
          language: {
            label: t("language.label"),
            switch: t("language.switch"),
            en: t("language.en"),
            bn: t("language.bn"),
          },
          theme: {
            label: t("theme.label"),
            toggle: t("theme.toggle"),
            light: t("theme.light"),
            dark: t("theme.dark"),
            system: t("theme.system"),
          },
        }}
      />
      {children}
    </div>
  )
}
