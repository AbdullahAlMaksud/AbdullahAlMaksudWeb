"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  LayoutDashboard,
  Mail,
  Newspaper,
  Settings,
} from "lucide-react"

import { Logo } from "@/components/brand/logo"
import type { DashboardShellLabels } from "@/components/dashboard/dashboard-shell"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useUIStore } from "@/store/use-ui-store"
import type { SiteConfig } from "@/types/content"

const dashboardNav = [
  { key: "overview", href: "/dashboard", icon: LayoutDashboard },
  { key: "projects", href: "/dashboard/projects", icon: FolderKanban },
  { key: "blog", href: "/dashboard/blog", icon: Newspaper },
  { key: "books", href: "/dashboard/books", icon: BookOpen },
  { key: "analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { key: "messages", href: "/dashboard/messages", icon: Mail },
  { key: "settings", href: "/dashboard/settings", icon: Settings },
] as const

export function DashboardSidebar({
  labels,
  mobile = false,
  onNavigate,
  site,
}: {
  labels: DashboardShellLabels
  mobile?: boolean
  onNavigate?: () => void
  site: SiteConfig
}) {
  const pathname = usePathname()
  const collapsed = useUIStore((state) => state.sidebarCollapsed)
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)
  const compact = collapsed && !mobile

  return (
    <aside
      className={cn(
        "flex flex-col border-r bg-sidebar/80 backdrop-blur-xl transition-[width] duration-300",
        mobile ? "h-full" : "sticky top-0 h-svh max-h-svh overflow-hidden",
        compact ? "w-[88px]" : "w-[276px]",
        mobile && "w-full border-r-0"
      )}
    >
      <div className="flex h-20 shrink-0 items-center justify-between px-5">
        <Logo compact={compact} name={site.name} />
        {!mobile && (
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={labels.navigation}
            onClick={toggleSidebar}
          >
            {compact ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        )}
      </div>
      <nav className="grid min-h-0 flex-1 content-start gap-1 overflow-y-auto px-3 pb-2">
        {dashboardNav.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium text-muted-foreground transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                active && "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary hover:text-primary-foreground",
                compact && "justify-center px-0"
              )}
            >
              <item.icon className="size-4 shrink-0" />
              {!compact && <span>{labels.nav[item.key]}</span>}
            </Link>
          )
        })}
      </nav>
      <div className="shrink-0 p-4">
        <div className="flex items-center gap-3 rounded-2xl bg-muted/60 p-3">
          <Avatar>
            <AvatarImage src="/images/portfolio-hero.png" alt={site.owner} />
            <AvatarFallback>{initials(site.owner)}</AvatarFallback>
          </Avatar>
          {!compact && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{site.owner}</p>
              <p className="truncate text-xs text-muted-foreground">
                {labels.viewProfile}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
}
