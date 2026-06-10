"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { localeCookieName, type Locale } from "@/lib/i18n/resources"
import { cn } from "@/lib/utils"
import { LanguagesIcon } from "lucide-react"
import { Button } from "../ui/button"

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
    document.cookie = `${localeCookieName}=${nextLocale};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`
    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <Button
      onClick={() => setLocale(isBangla ? "en" : "bn")}
      disabled={isPending}
      variant={isBangla ? "outline" : "secondary"}
    >
      <LanguagesIcon />
      <span
        className={cn(
          "w-6 text-center transition-colors",
          !isBangla ? "text-foreground" : "text-muted-foreground"
        )}
        title={labels.en}
      >
        {isBangla ? "En" : "বাং"}
      </span>
    </Button>
  )
}
