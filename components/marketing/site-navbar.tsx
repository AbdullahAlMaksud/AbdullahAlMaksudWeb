"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { Logo } from "@/components/brand/logo"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { marketingNav } from "@/constants/site"
import { cn } from "@/lib/utils"
import * as React from "react"

export function SiteNavbar() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <header className="sticky top-3 z-40 mx-auto w-full max-w-7xl px-4">
      <div className="glass-panel premium-border flex h-16 items-center justify-between rounded-2xl px-4">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {marketingNav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
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
          <ThemeToggle />
          <Link
            href="/about#contact"
            className={buttonVariants({
              className:
                "h-10 rounded-xl bg-primary px-5 text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90",
            })}
          >
            Contact Me
          </Link>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="outline"
            size="icon-lg"
            aria-label="Open menu"
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
              <Logo />
            </SheetTitle>
          </SheetHeader>
          <div className="grid gap-2 px-4">
            {marketingNav.map((item) => (
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
              Open Dashboard
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
