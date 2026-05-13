"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Logo } from "@/components/brand/logo"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { dashboardNav } from "@/constants/dashboard"
import { cn } from "@/lib/utils"
import { useUIStore } from "@/store/use-ui-store"

export function DashboardSidebar({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const collapsed = useUIStore((state) => state.sidebarCollapsed)
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)
  const compact = collapsed && !mobile

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r bg-sidebar/80 backdrop-blur-xl transition-[width] duration-300",
        compact ? "w-[88px]" : "w-[276px]",
        mobile && "w-full border-r-0"
      )}
    >
      <div className="flex h-20 items-center justify-between px-5">
        <Logo compact={compact} />
        {!mobile && (
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Toggle sidebar"
            onClick={toggleSidebar}
          >
            {compact ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        )}
      </div>
      <nav className="grid gap-1 px-3">
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
              {!compact && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto p-4">
        <div className="flex items-center gap-3 rounded-2xl bg-muted/60 p-3">
          <Avatar>
            <AvatarImage src="/images/portfolio-hero.png" alt="Rakibul Islam" />
            <AvatarFallback>RI</AvatarFallback>
          </Avatar>
          {!compact && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Rakibul Islam</p>
              <p className="truncate text-xs text-muted-foreground">View Profile</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
