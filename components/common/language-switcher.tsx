"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Switch } from "@/components/ui/switch"
import type { Locale } from "@/lib/i18n/resources"
import { cn } from "@/lib/utils"

export type LanguageSwitcherLabels = {
  label: string
  switch: string
} & Record<Locale, string>

export function LanguageSwitcher({
  locale,
  labels,
}: {
  locale: Locale
  labels: LanguageSwitcherLabels
}) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const isBangla = locale === "bn"

  function setLocale(nextLocale: Locale) {
    if (nextLocale === locale) return

    startTransition(async () => {
      await fetch("/api/locale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ locale: nextLocale }),
      })
      router.refresh()
    })
  }

  return (
    <div
      aria-label={labels.label}
      className="inline-flex h-10 items-center gap-2 rounded-xl border bg-background/70 px-2 text-xs font-semibold"
      title={labels.switch}
    >
      <span
        className={cn(
          "w-6 text-center transition-colors",
          !isBangla ? "text-foreground" : "text-muted-foreground"
        )}
        title={labels.en}
      >
        EN
      </span>
      <Switch
        aria-label={labels.switch}
        checked={isBangla}
        disabled={isPending}
        onCheckedChange={(checked) => setLocale(checked ? "bn" : "en")}
        size="sm"
      />
      <span
        className={cn(
          "w-6 text-center transition-colors",
          isBangla ? "text-foreground" : "text-muted-foreground"
        )}
        title={labels.bn}
      >
        BN
      </span>
    </div>
  )
}
