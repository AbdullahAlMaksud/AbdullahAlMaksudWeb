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
import { KeyboardShortcuts } from "@/components/common/keyboard-shortcuts"
import type { Locale } from "@/lib/i18n/resources"

export function AppProviders({
  children,
  commandLabels,
  locale,
}: {
  children: React.ReactNode
  commandLabels: CommandPaletteLabels
  locale: Locale
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
          <KeyboardShortcuts locale={locale} />
          {children}
          <CommandPalette labels={commandLabels} />
          <Toaster richColors closeButton position="top-right" />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
