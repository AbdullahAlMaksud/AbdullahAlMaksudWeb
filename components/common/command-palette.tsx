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

const routes = [
  { label: "Home", href: "/", icon: Home, group: "Portfolio" },
  { label: "Projects", href: "/projects", icon: FolderKanban, group: "Portfolio" },
  { label: "Blog", href: "/blog", icon: Newspaper, group: "Portfolio" },
  { label: "Books", href: "/books", icon: BookOpen, group: "Portfolio" },
  { label: "About", href: "/about", icon: UserRound, group: "Portfolio" },
  { label: "Dashboard", href: "/dashboard", icon: BarChart3, group: "Dashboard" },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3, group: "Dashboard" },
  { label: "Messages", href: "/dashboard/messages", icon: Mail, group: "Dashboard" },
  { label: "Settings", href: "/dashboard/settings", icon: Settings, group: "Dashboard" },
]

export function CommandPalette() {
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
        <CommandInput placeholder="Search pages, projects, and actions..." />
        <CommandList>
          <CommandEmpty>No command found.</CommandEmpty>
          {["Portfolio", "Dashboard"].map((group) => (
            <CommandGroup key={group} heading={group}>
              {routes
                .filter((route) => route.group === group)
                .map((route) => (
                  <CommandItem
                    key={route.href}
                    value={route.label}
                    onSelect={() => runCommand(route.href)}
                  >
                    <route.icon className="size-4" />
                    {route.label}
                    <CommandShortcut>
                      <Keyboard className="mr-1 inline size-3" />
                      Enter
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
