import type { ReactNode } from "react"

import { VerticalNavbar } from "@/components/marketing/vertical-navbar"
import { WavyBackground } from "@/components/marketing/wavy-background"
import { getSiteData } from "@/lib/data"
import { getI18n, getRequestLocale } from "@/lib/i18n/server"

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

  return (
    <div className="relative isolate min-h-svh overflow-hidden">
      <WavyBackground intensity="medium" speed="slow" />
      <VerticalNavbar
        locale={locale}
        nav={marketingNav}
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
