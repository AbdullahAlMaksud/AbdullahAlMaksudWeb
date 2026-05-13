import type * as React from "react"

import { cn } from "@/lib/utils"

export function MotionSection({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "animate-in duration-700 fade-in slide-in-from-bottom-4",
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}
