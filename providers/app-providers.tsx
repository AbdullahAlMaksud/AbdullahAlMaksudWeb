"use client"

import * as React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "sonner"

import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import {
  CommandPalette,
  type CommandPaletteLabels,
} from "@/components/common/command-palette"
import { CursorGlow } from "@/components/common/cursor-glow"

export function AppProviders({
  children,
  commandLabels,
}: {
  children: React.ReactNode
  commandLabels: CommandPaletteLabels
}) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <CursorGlow />
          {children}
          <CommandPalette labels={commandLabels} />
          <Toaster richColors closeButton position="top-right" />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
