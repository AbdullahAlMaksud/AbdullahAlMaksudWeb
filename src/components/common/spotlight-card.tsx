import type * as React from "react"

import { cn } from "@/lib/utils"

export function SpotlightCard({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl premium-border glass-panel transition-transform duration-300 hover:-translate-y-1",
        "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] hover:before:opacity-100",
        "before:bg-[radial-gradient(520px_circle_at_50%_0%,rgba(139,92,246,0.18),transparent_46%)]",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </div>
  )
}
