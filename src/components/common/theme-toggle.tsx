"use client"

import { Circle, Feather, Laptop, Leaf, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export type ThemeToggleLabels = {
  label: string
  toggle: string
  light: string
  sepia?: string
  emerald?: string
  dark: string
  black?: string
  system: string
}

const defaultLabels: ThemeToggleLabels = {
  label: "Theme",
  toggle: "Toggle theme",
  light: "Light",
  sepia: "Sepia",
  emerald: "Emerald",
  dark: "Dark",
  black: "Black",
  system: "System",
}

export function ThemeToggle({
  labels = defaultLabels,
}: {
  labels?: ThemeToggleLabels
}) {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger
          render={
            <DropdownMenuTrigger
              render={<Button variant="ghost" size="icon-lg" />}
            />
          }
        >
          <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">{labels.toggle}</span>
        </TooltipTrigger>
        <TooltipContent>{labels.label}</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="size-4" />
          {labels.light}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("sepia")}>
          <Feather className="size-4" />
          {labels.sepia ?? defaultLabels.sepia}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("emerald")}>
          <Leaf className="size-4" />
          {labels.emerald ?? defaultLabels.emerald}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="size-4" />
          {labels.dark}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("black")}>
          <Circle className="size-4" />
          {labels.black ?? defaultLabels.black}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Laptop className="size-4" />
          {labels.system}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
