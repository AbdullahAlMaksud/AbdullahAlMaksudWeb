"use client"

import * as React from "react"

export function CursorGlow() {
  const glowRef = React.useRef<HTMLDivElement>(null)
  const dotRef = React.useRef<HTMLDivElement>(null)
  const frame = React.useRef<number | null>(null)

  React.useEffect(() => {
    function onMouseMove(event: MouseEvent) {
      if (frame.current) {
        cancelAnimationFrame(frame.current)
      }

      frame.current = requestAnimationFrame(() => {
        if (glowRef.current) {
          glowRef.current.style.transform = `translate3d(${event.clientX - 144}px, ${
            event.clientY - 144
          }px, 0)`
        }

        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${event.clientX - 4}px, ${
            event.clientY - 4
          }px, 0)`
        }
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
    <>
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none fixed z-40 hidden size-72 rounded-full bg-primary/18 opacity-70 mix-blend-screen blur-3xl will-change-transform md:block"
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed z-[60] hidden size-2 rounded-full bg-primary shadow-[0_0_22px_color-mix(in_oklab,var(--primary)_70%,transparent)] will-change-transform md:block"
      />
    </>
  )
}
