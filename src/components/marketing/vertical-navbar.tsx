"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Home,
  Layers,
  FileText,
  BookOpen,
  User,
  Sun,
  Moon,
  Circle,
  Feather,
  Languages,
  Pin,
  PinOff,
  Maximize,
  Minimize,
  Leaf,
  Laptop,
} from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import type { NavItem, PortfolioProject } from "@/types/content"
import { localeCookieName, type Locale } from "@/lib/i18n/resources"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const NAV_ICONS: Record<string, React.ElementType> = {
  "/": Home,
  "/projects": Layers,
  "/blog": FileText,
  "/books": BookOpen,
  "/about": User,
}

export type VerticalNavbarLabels = {
  pin: string
  unpin: string
  theme: string
  light: string
  sepia: string
  emerald: string
  dark: string
  black: string
  system: string
  language: string
  fullscreen: string
  exitFullscreen: string
}

export function VerticalNavbar({
  locale,
  nav,
  projects = [],
  labels,
}: {
  locale: Locale
  nav: NavItem[]
  projects?: PortfolioProject[]
  labels: VerticalNavbarLabels
}) {
  const pathname = usePathname()
  const { setTheme } = useTheme()
  const router = useRouter()
  const [isPinned, setIsPinned] = React.useState(true)
  const [isVisible, setIsVisible] = React.useState(true)
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()
  const hideTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  // Auto-show when mouse near left edge
  React.useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isPinned) return
      if (e.clientX < 72) {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
        setIsVisible(true)
      } else if (e.clientX > 220 && isVisible) {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
        hideTimerRef.current = setTimeout(() => setIsVisible(false), 1200)
      }
    }
    document.addEventListener("mousemove", onMouseMove)
    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [isPinned, isVisible])

  // Fullscreen sync
  React.useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener("fullscreenchange", onChange)
    return () => document.removeEventListener("fullscreenchange", onChange)
  }, [])

  const handleNavbarMouseEnter = () => {
    if (!isPinned) {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
      setIsVisible(true)
    }
  }

  const handleNavbarMouseLeave = () => {
    if (!isPinned) {
      hideTimerRef.current = setTimeout(() => setIsVisible(false), 800)
    }
  }

  const toggleLanguage = () => {
    const next: Locale = locale === "bn" ? "en" : "bn"
    document.cookie = `${localeCookieName}=${next};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`
    startTransition(() => {
      router.refresh()
    })
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  const shown = isPinned || isVisible

  return (
    <>
      {/* Invisible edge trigger strip */}
      {!isPinned && (
        <div
          className="fixed top-0 left-0 z-40 h-full w-4"
          onMouseEnter={() => setIsVisible(true)}
        />
      )}

      {/* Navbar panel */}
      <div
        className={cn(
          "fixed top-1/2 left-3 z-50 -translate-y-1/2 transition-all duration-300 ease-in-out",
          shown
            ? "translate-x-0 opacity-100"
            : "pointer-events-none -translate-x-16 opacity-0"
        )}
        onMouseEnter={handleNavbarMouseEnter}
        onMouseLeave={handleNavbarMouseLeave}
      >
        <div className="glass-panel premium-border flex flex-col items-center gap-1 rounded-2xl px-2 py-3">
          {/* Nav items */}
          {nav.map((item) => {
            const Icon = NAV_ICONS[item.href] ?? Home
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href)

            if (item.href === "/projects") {
              return (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    className={cn(
                      "flex size-9 items-center justify-center rounded-xl transition-colors",
                      active
                        ? "bg-primary/15 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="size-4" />
                  </Link>
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 left-full h-16 w-3 -translate-y-1/2"
                  />
                  <div className="pointer-events-none absolute top-1/2 left-full ml-3 flex translate-x-2 -translate-y-1/2 items-center gap-2 rounded-2xl glass-panel premium-border p-2 opacity-0 shadow-2xl transition duration-200 group-focus-within:pointer-events-auto group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100">
                    {projects.map((project, index) => (
                      <Link
                        key={project.id}
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={project.title}
                        className="relative flex size-14 translate-y-3 items-center justify-center overflow-hidden rounded-xl border border-border/50 bg-background/30 p-2.5 opacity-100 shadow-sm transition duration-300 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-muted hover:border-border hover:shadow-lg"
                        style={{ transitionDelay: `${index * 45}ms` }}
                      >
                        <span className="relative z-10 block size-full">
                          <Image
                            src={project.logo || project.coverImage}
                            alt={project.title}
                            fill
                            sizes="28px"
                            className="object-contain object-center"
                          />
                        </span>

                        <span className="pointer-events-none absolute inset-0 bg-black/5 dark:bg-white/5" />
                        <span className="sr-only">{project.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            }

            return (
              <Tooltip key={item.href}>
                <TooltipTrigger
                  render={
                    <Link
                      href={item.href}
                      className={cn(
                        "flex size-9 items-center justify-center rounded-xl transition-colors",
                        active
                          ? "bg-primary/15 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    />
                  }
                >
                  <Icon className="size-4" />
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            )
          })}

          <div className="my-1 h-px w-6 bg-border" />

          {/* Theme toggle */}
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger
                render={
                  <DropdownMenuTrigger
                    render={
                      <button className="relative flex size-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" />
                    }
                  />
                }
              >
                <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              </TooltipTrigger>
              <TooltipContent side="right">{labels.theme}</TooltipContent>
            </Tooltip>
            <DropdownMenuContent side="right" align="center" className="w-40">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="size-4" />
                {labels.light}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("sepia")}>
                <Feather className="size-4" />
                {labels.sepia}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("emerald")}>
                <Leaf className="size-4" />
                {labels.emerald}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="size-4" />
                {labels.dark}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("black")}>
                <Circle className="size-4" />
                {labels.black}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Laptop className="size-4" />
                {labels.system}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Language toggle */}
          <Tooltip>
            <TooltipTrigger
              render={
                <button
                  onClick={toggleLanguage}
                  disabled={isPending}
                  className="flex size-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
                />
              }
            >
              <Languages className="size-4" />
            </TooltipTrigger>
            <TooltipContent side="right">
              {locale === "bn" ? "English" : "বাংলা"}
            </TooltipContent>
          </Tooltip>

          {/* Fullscreen */}
          <Tooltip>
            <TooltipTrigger
              render={
                <button
                  onClick={toggleFullscreen}
                  className="flex size-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                />
              }
            >
              {isFullscreen ? (
                <Minimize className="size-4" />
              ) : (
                <Maximize className="size-4" />
              )}
            </TooltipTrigger>
            <TooltipContent side="right">
              {isFullscreen ? labels.exitFullscreen : labels.fullscreen}
            </TooltipContent>
          </Tooltip>

          {/* Pin toggle */}
          <Tooltip>
            <TooltipTrigger
              render={
                <button
                  onClick={() => setIsPinned((p) => !p)}
                  className={cn(
                    "flex size-9 items-center justify-center rounded-xl transition-colors",
                    isPinned
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                />
              }
            >
              {isPinned ? (
                <Pin className="size-4" />
              ) : (
                <PinOff className="size-4" />
              )}
            </TooltipTrigger>
            <TooltipContent side="right">
              {isPinned ? labels.unpin : labels.pin}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </>
  )
}
