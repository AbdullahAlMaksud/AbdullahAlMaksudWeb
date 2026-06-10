"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { Logo } from "@/components/brand/logo"
import {
  LanguageSwitcher,
  type LanguageSwitcherLabels,
} from "@/components/common/language-switcher"
import { ThemeToggle } from "@/components/common/theme-toggle"
import type { ThemeToggleLabels } from "@/components/common/theme-toggle"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import type { Locale } from "@/lib/i18n/resources"
import { cn } from "@/lib/utils"
import type { NavItem } from "@/types/content"
import * as React from "react"

export function SiteNavbar({
  locale,
  nav,
  siteName,
  labels,
}: {
  locale: Locale
  nav: NavItem[]
  siteName: string
  labels: {
    contact: string
    openDashboard: string
    openMenu: string
    language: LanguageSwitcherLabels
    theme: ThemeToggleLabels
  }
}) {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <header className="sticky top-1 z-40 mx-auto w-full max-w-7xl px-4">
      <div className="glass-panel premium-border flex h-16 items-center justify-between rounded-2xl px-4">
        <Logo
          name={siteName}
          className="flex-1 pr-3 md:flex-none md:pr-0"
          textClassName="truncate md:max-w-none"
        />
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground",
                  active && "bg-primary/10 text-primary"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher locale={locale} labels={labels.language} />
          <ThemeToggle labels={labels.theme} />
          <Link
            href="/about#contact"
            className={buttonVariants({
              className:
                "h-10 rounded-xl bg-primary px-5 text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90",
            })}
          >
            {labels.contact}
          </Link>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher locale={locale} labels={labels.language} />
          <ThemeToggle labels={labels.theme} />
          <Button
            variant="outline"
            size="icon-lg"
            aria-label={labels.openMenu}
            onClick={() => setOpen(true)}
          >
            <Menu className="size-4" />
          </Button>
        </div>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-[86vw] p-0">
          <SheetHeader>
            <SheetTitle>
              <Logo name={siteName} />
            </SheetTitle>
          </SheetHeader>
          <div className="grid gap-2 px-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-xl bg-primary px-3 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              {labels.openDashboard}
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
