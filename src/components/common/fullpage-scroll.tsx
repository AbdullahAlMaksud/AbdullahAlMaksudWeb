"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

interface FullpageScrollProps {
  children: React.ReactNode[]
  className?: string
}

export function FullpageScroll({ children, className }: FullpageScrollProps) {
  const [current, setCurrent] = React.useState(0)
  const [isAnimating, setIsAnimating] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const total = React.Children.count(children)

  const goTo = React.useCallback(
    (index: number) => {
      if (isAnimating || index < 0 || index >= total) return
      setIsAnimating(true)
      setCurrent(index)
    },
    [isAnimating, total]
  )

  const goNext = React.useCallback(() => goTo(current + 1), [current, goTo])
  const goPrev = React.useCallback(() => goTo(current - 1), [current, goTo])

  // Expose goNext for use by hero section
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      ;(
        window as typeof window & { __fullpageGoNext?: () => void }
      ).__fullpageGoNext = goNext
    }
  }, [goNext])

  // Wheel handler
  React.useEffect(() => {
    let lastScrollTime = 0
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const now = Date.now()
      if (now - lastScrollTime < 420) return
      lastScrollTime = now
      if (e.deltaY > 0) goNext()
      else goPrev()
    }
    const el = containerRef.current
    el?.addEventListener("wheel", onWheel, { passive: false })
    return () => el?.removeEventListener("wheel", onWheel)
  }, [goNext, goPrev])

  // Touch handler
  React.useEffect(() => {
    let touchStartY = 0
    let lastTouchTime = 0

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }
    const onTouchEnd = (e: TouchEvent) => {
      const now = Date.now()
      if (now - lastTouchTime < 420) return
      const delta = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(delta) < 34) return
      lastTouchTime = now
      if (delta > 0) goNext()
      else goPrev()
    }
    const el = containerRef.current
    el?.addEventListener("touchstart", onTouchStart, { passive: true })
    el?.addEventListener("touchend", onTouchEnd, { passive: true })
    return () => {
      el?.removeEventListener("touchstart", onTouchStart)
      el?.removeEventListener("touchend", onTouchEnd)
    }
  }, [goNext, goPrev])

  // Keyboard handler
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") goNext()
      if (e.key === "ArrowUp" || e.key === "PageUp") goPrev()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [goNext, goPrev])

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      y: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  }

  const [prevCurrent, setPrevCurrent] = React.useState(0)
  const direction = current > prevCurrent ? 1 : -1

  const handleAnimationComplete = () => {
    setIsAnimating(false)
    setPrevCurrent(current)
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative h-svh overflow-hidden", className)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { type: "tween", duration: 0.42, ease: [0.76, 0, 0.24, 1] },
            opacity: { duration: 0.2 },
          }}
          onAnimationComplete={handleAnimationComplete}
          className="absolute inset-0 h-full w-full"
        >
          {React.Children.toArray(children)[current]}
        </motion.div>
      </AnimatePresence>

      {/* Section indicators */}
      <div className="fixed top-1/2 right-4 z-50 flex -translate-y-1/2 flex-col gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === current
                ? "w-6 bg-foreground"
                : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/70"
            )}
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </div>

      {/* Up/Down nav arrows */}
      {current > 0 && (
        <button
          onClick={goPrev}
          className="fixed top-4 left-1/2 z-50 flex size-8 -translate-x-1/2 items-center justify-center rounded-full bg-background/60 text-muted-foreground backdrop-blur-sm transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Previous section"
        >
          <ChevronUp className="size-4" />
        </button>
      )}
    </div>
  )
}

/** Triggers the fullpage scroll to go to the next section */
export function useFullpageNext() {
  return React.useCallback(() => {
    const fn = (window as typeof window & { __fullpageGoNext?: () => void })
      .__fullpageGoNext
    fn?.()
  }, [])
}
