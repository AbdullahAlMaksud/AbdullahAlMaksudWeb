"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  BarChart3,
  BookOpen,
  FolderKanban,
  Home,
  Keyboard,
  Mail,
  Newspaper,
  Settings,
  UserRound,
} from "lucide-react"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import { useUIStore } from "@/store/use-ui-store"

export type CommandPaletteLabels = {
  placeholder: string
  empty: string
  shortcut: string
  groups: Record<"portfolio" | "dashboard", string>
  routes: Record<
    | "home"
    | "projects"
    | "blog"
    | "books"
    | "about"
    | "dashboard"
    | "analytics"
    | "messages"
    | "settings",
    string
  >
}

const routes = [
  { key: "home", href: "/", icon: Home, group: "portfolio" },
  { key: "projects", href: "/projects", icon: FolderKanban, group: "portfolio" },
  { key: "blog", href: "/blog", icon: Newspaper, group: "portfolio" },
  { key: "books", href: "/books", icon: BookOpen, group: "portfolio" },
  { key: "about", href: "/about", icon: UserRound, group: "portfolio" },
  { key: "dashboard", href: "/dashboard", icon: BarChart3, group: "dashboard" },
  { key: "analytics", href: "/dashboard/analytics", icon: BarChart3, group: "dashboard" },
  { key: "messages", href: "/dashboard/messages", icon: Mail, group: "dashboard" },
  { key: "settings", href: "/dashboard/settings", icon: Settings, group: "dashboard" },
] as const

export function CommandPalette({ labels }: { labels: CommandPaletteLabels }) {
  const router = useRouter()
  const open = useUIStore((state) => state.commandOpen)
  const setOpen = useUIStore((state) => state.setCommandOpen)

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen(!open)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, setOpen])

  function runCommand(href: string) {
    setOpen(false)
    router.push(href)
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen} className="sm:max-w-xl">
      <Command>
        <CommandInput placeholder={labels.placeholder} />
        <CommandList>
          <CommandEmpty>{labels.empty}</CommandEmpty>
          {(["portfolio", "dashboard"] as const).map((group) => (
            <CommandGroup key={group} heading={labels.groups[group]}>
              {routes
                .filter((route) => route.group === group)
                .map((route) => (
                  <CommandItem
                    key={route.href}
                    value={labels.routes[route.key]}
                    onSelect={() => runCommand(route.href)}
                  >
                    <route.icon className="size-4" />
                    {labels.routes[route.key]}
                    <CommandShortcut>
                      <Keyboard className="mr-1 inline size-3" />
                      {labels.shortcut}
                    </CommandShortcut>
                  </CommandItem>
                ))}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
