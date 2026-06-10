import Link from "next/link"
import type { ReactNode } from "react"

import { Logo } from "@/components/brand/logo"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { getSiteData } from "@/lib/data"
import { getI18n, getRequestLocale } from "@/lib/i18n/server"

export default async function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  const locale = await getRequestLocale()
  const [{ siteConfig }, { t }] = await Promise.all([
    getSiteData(locale),
    getI18n(locale, "common"),
  ])

  return (
    <main className="relative z-10 flex min-h-svh flex-col bg-background">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5">
        <Logo name={siteConfig.name} textClassName="truncate" />
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            {t("auth.backHome")}
          </Link>
          <ThemeToggle
            labels={{
              label: t("theme.label"),
              toggle: t("theme.toggle"),
              light: t("theme.light"),
              sepia: t("theme.sepia"),
              emerald: t("theme.emerald"),
              dark: t("theme.dark"),
              black: t("theme.black"),
              system: t("theme.system"),
            }}
          />
        </div>
      </header>
      <section className="flex flex-1 items-center justify-center px-4 py-10">
        {children}
      </section>
    </main>
  )
}
