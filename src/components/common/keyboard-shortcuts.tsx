"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { localeCookieName, type Locale } from "@/lib/i18n/resources"

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false

  const tagName = target.tagName.toLowerCase()

  return (
    target.isContentEditable ||
    tagName === "input" ||
    tagName === "textarea" ||
    tagName === "select"
  )
}

export function KeyboardShortcuts({ locale }: { locale: Locale }) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  React.useEffect(() => {
    function toggleLanguage() {
      if (isPending) return

      const nextLocale: Locale = locale === "bn" ? "en" : "bn"
      document.cookie = `${localeCookieName}=${nextLocale};path=/;max-age=${
        60 * 60 * 24 * 365
      };samesite=lax`

      startTransition(() => {
        router.refresh()
      })
    }

    function toggleFullscreen() {
      if (!document.fullscreenEnabled) return

      if (document.fullscreenElement) {
        void document.exitFullscreen().catch(() => undefined)
        return
      }

      void document.documentElement.requestFullscreen().catch(() => undefined)
    }

    function onKeyDown(event: KeyboardEvent) {
      if (
        event.defaultPrevented ||
        event.repeat ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        isEditableTarget(event.target)
      ) {
        return
      }

      const key = event.key.toLowerCase()

      if (key === "l") {
        event.preventDefault()
        toggleLanguage()
      }

      if (key === "f") {
        event.preventDefault()
        toggleFullscreen()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isPending, locale, router])

  return null
}
