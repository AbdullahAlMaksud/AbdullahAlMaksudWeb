"use client"

import { Bell, Menu, Search, UserRound } from "lucide-react"

import {
  LanguageSwitcher,
} from "@/components/common/language-switcher"
import { ThemeToggle } from "@/components/common/theme-toggle"
import type { DashboardShellLabels } from "@/components/dashboard/dashboard-shell"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import type { Locale } from "@/lib/i18n/resources"
import { useUIStore } from "@/store/use-ui-store"
import type { Notification, SiteConfig } from "@/types/content"

export function DashboardTopbar({
  labels,
  locale,
  notifications,
  onMenu,
  site,
}: {
  labels: DashboardShellLabels
  locale: Locale
  notifications: Notification[]
  onMenu: () => void
  site: SiteConfig
}) {
  const setCommandOpen = useUIStore((state) => state.setCommandOpen)

  return (
    <header className="sticky top-0 z-30 border-b bg-background/78 backdrop-blur-xl">
      <div className="flex h-20 items-center gap-3 px-4 lg:px-6">
        <Button
          variant="outline"
          size="icon-lg"
          className="lg:hidden"
          aria-label={labels.topbar.openSidebar}
          onClick={onMenu}
        >
          <Menu className="size-4" />
        </Button>
        <div className="min-w-0 flex-1">
          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            className="relative hidden w-full max-w-md md:block"
          >
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              readOnly
              placeholder={labels.topbar.search}
              className="h-11 cursor-pointer rounded-xl pl-10 pr-20"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              Ctrl K
            </span>
          </button>
        </div>
        <LanguageSwitcher locale={locale} labels={labels.language} />
        <ThemeToggle labels={labels.theme} />
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon-lg" />}>
            <Bell className="size-4" />
            <span className="sr-only">{labels.topbar.notifications}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              {labels.topbar.notifications}
              <Badge variant="secondary">{labels.topbar.newCount}</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((item) => (
              <DropdownMenuItem key={item.id} className="items-start gap-3 py-3">
                <span className="mt-1 size-2 rounded-full bg-primary" />
                <span className="grid gap-1">
                  <span className="font-medium">{item.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {item.description}
                  </span>
                </span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {item.time}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" className="h-11 rounded-xl px-2" />}>
            <Avatar className="size-7">
              <AvatarImage src="/images/portfolio-hero.png" alt={site.owner} />
              <AvatarFallback>{initials(site.owner)}</AvatarFallback>
            </Avatar>
            <span className="hidden px-1 text-sm font-medium sm:inline">
              {site.owner.split(" ")[0]}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>{labels.topbar.admin}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserRound className="size-4" />
              {labels.topbar.profile}
            </DropdownMenuItem>
            <DropdownMenuItem>{labels.topbar.settings}</DropdownMenuItem>
            <DropdownMenuItem>{labels.topbar.signOut}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
}
