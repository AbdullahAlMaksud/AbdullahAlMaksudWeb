"use client"

import { Bell, Menu, Search, UserRound } from "lucide-react"

import { ThemeToggle } from "@/components/common/theme-toggle"
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
import { notifications } from "@/constants/mock-data"
import { useUIStore } from "@/store/use-ui-store"

export function DashboardTopbar({ onMenu }: { onMenu: () => void }) {
  const setCommandOpen = useUIStore((state) => state.setCommandOpen)

  return (
    <header className="sticky top-0 z-30 border-b bg-background/78 backdrop-blur-xl">
      <div className="flex h-20 items-center gap-3 px-4 lg:px-6">
        <Button
          variant="outline"
          size="icon-lg"
          className="lg:hidden"
          aria-label="Open sidebar"
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
              placeholder="Search anything..."
              className="h-11 cursor-pointer rounded-xl pl-10 pr-20"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              Ctrl K
            </span>
          </button>
        </div>
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon-lg" />}>
            <Bell className="size-4" />
            <span className="sr-only">Notifications</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              <Badge variant="secondary">{notifications.length} new</Badge>
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
              <AvatarImage src="/images/portfolio-hero.png" alt="Rakibul Islam" />
              <AvatarFallback>RI</AvatarFallback>
            </Avatar>
            <span className="hidden px-1 text-sm font-medium sm:inline">Rakibul</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Portfolio Admin</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserRound className="size-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Sign out mock</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
