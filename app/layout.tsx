import type { Metadata } from "next"

import "./globals.css"
import { AppProviders } from "@/providers/app-providers"
import type { CommandPaletteLabels } from "@/components/common/command-palette"
import { getSiteData } from "@/lib/data"
import { getI18n, getRequestLocale } from "@/lib/i18n/server"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const { siteConfig } = await getSiteData(locale)

  return {
    title: {
      default: `${siteConfig.owner} - ${siteConfig.name}`,
      template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { locale, t } = await getI18n(await getRequestLocale(), "common")
  const commandLabels: CommandPaletteLabels = {
    placeholder: t("command.placeholder"),
    empty: t("command.empty"),
    shortcut: t("command.shortcut"),
    groups: {
      portfolio: t("command.groups.portfolio"),
      dashboard: t("command.groups.dashboard"),
    },
    routes: {
      home: t("command.routes.home"),
      projects: t("command.routes.projects"),
      blog: t("command.routes.blog"),
      books: t("command.routes.books"),
      about: t("command.routes.about"),
      dashboard: t("command.routes.dashboard"),
      analytics: t("command.routes.analytics"),
      messages: t("command.routes.messages"),
      settings: t("command.routes.settings"),
    },
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <AppProviders commandLabels={commandLabels}>{children}</AppProviders>
      </body>
    </html>
  )
}
