"use client"

import * as React from "react"

export function CursorGlow() {
  const ref = React.useRef<HTMLDivElement>(null)
  const frame = React.useRef<number | null>(null)

  React.useEffect(() => {
    function onMouseMove(event: MouseEvent) {
      if (frame.current) {
        cancelAnimationFrame(frame.current)
      }

      frame.current = requestAnimationFrame(() => {
        if (!ref.current) return
        ref.current.style.transform = `translate3d(${event.clientX - 160}px, ${event.clientY - 160}px, 0)`
      })
    }

    window.addEventListener("mousemove", onMouseMove)
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      if (frame.current) {
        cancelAnimationFrame(frame.current)
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed z-0 hidden size-80 rounded-full bg-primary/10 blur-3xl will-change-transform lg:block"
    />
  )
}
