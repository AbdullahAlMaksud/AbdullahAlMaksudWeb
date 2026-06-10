"use client"

import { useScrollProgress } from "@/hooks/use-scroll-progress"

export function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-primary"
      style={{ transform: `scaleX(${progress})` }}
    />
  )
}
