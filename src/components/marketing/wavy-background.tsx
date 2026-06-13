"use client"

import * as React from "react"
import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"

type WavyBackgroundProps = {
  className?: string
  intensity?: "subtle" | "medium" | "strong"
  speed?: "slow" | "medium" | "fast"
}

const intensityMap = {
  subtle: 0.16,
  medium: 0.24,
  strong: 0.34,
} as const

const speedMap = {
  slow: "22s",
  medium: "16s",
  fast: "10s",
} as const

const viewBox = {
  width: 1440,
  height: 960,
} as const

type CursorPoint = {
  x: number
  y: number
}

type WaveLine = {
  baseY: number
  phase: number
  amplitude: number
  xStart: number
  xEnd: number
  samples: number
}

function pointsToPath(points: CursorPoint[]) {
  if (points.length === 0) return ""

  const [first] = points
  let path = `M ${first.x.toFixed(1)} ${first.y.toFixed(1)}`

  for (let index = 0; index < points.length - 1; index += 1) {
    const previous = points[index - 1] ?? points[index]
    const current = points[index]
    const next = points[index + 1]
    const afterNext = points[index + 2] ?? next

    const cp1 = {
      x: current.x + (next.x - previous.x) / 6,
      y: current.y + (next.y - previous.y) / 6,
    }
    const cp2 = {
      x: next.x - (afterNext.x - current.x) / 6,
      y: next.y - (afterNext.y - current.y) / 6,
    }

    path += ` C ${cp1.x.toFixed(1)} ${cp1.y.toFixed(1)}, ${cp2.x.toFixed(
      1
    )} ${cp2.y.toFixed(1)}, ${next.x.toFixed(1)} ${next.y.toFixed(1)}`
  }

  return path
}

function buildWavePath(
  line: WaveLine,
  cursor: CursorPoint | null,
  bendStrength: number
) {
  const points = Array.from({ length: line.samples }, (_, index) => {
    const progress = index / (line.samples - 1)
    const x = line.xStart + (line.xEnd - line.xStart) * progress
    const baseWave =
      Math.sin(x / 135 + line.phase) * line.amplitude +
      Math.sin(x / 330 + line.phase * 1.7) * line.amplitude * 0.36
    const naturalY = line.baseY + baseWave

    if (!cursor) {
      return { x, y: naturalY }
    }

    const dx = x - cursor.x
    const dy = naturalY - cursor.y
    const influence = Math.exp(
      -((dx * dx) / (260 * 260) + (dy * dy) / (170 * 170))
    )
    const y = naturalY + (cursor.y - naturalY) * influence * bendStrength

    return { x, y }
  })

  return pointsToPath(points)
}

export function WavyBackground({
  className,
  intensity = "medium",
  speed = "slow",
}: WavyBackgroundProps) {
  const waveOpacity = intensityMap[intensity]
  const primaryRef = React.useRef<HTMLDivElement>(null)
  const secondaryRef = React.useRef<HTMLDivElement>(null)
  const primaryPathRefs = React.useRef<(SVGPathElement | null)[]>([])
  const secondaryPathRefs = React.useRef<(SVGPathElement | null)[]>([])
  const frameRef = React.useRef<number | null>(null)
  const primaryLines = React.useMemo(
    () =>
      Array.from({ length: 12 }).map((_, index) => ({
        baseY: 70 + index * 74,
        phase: index * 0.64,
        amplitude: index % 3 === 0 ? 17 : 12,
        xStart: -120,
        xEnd: 1680,
        samples: 16,
      })),
    []
  )
  const secondaryLines = React.useMemo(
    () =>
      Array.from({ length: 8 }).map((_, index) => ({
        baseY: 120 + index * 106,
        phase: index * 0.82 + 1.2,
        amplitude: 15,
        xStart: -160,
        xEnd: 1700,
        samples: 15,
      })),
    []
  )

  React.useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const pointerQuery = window.matchMedia("(pointer: fine)")

    function updateCurves(cursor: CursorPoint | null) {
      primaryLines.forEach((line, index) => {
        primaryPathRefs.current[index]?.setAttribute(
          "d",
          buildWavePath(line, cursor, 0.58)
        )
      })
      secondaryLines.forEach((line, index) => {
        secondaryPathRefs.current[index]?.setAttribute(
          "d",
          buildWavePath(line, cursor, 0.44)
        )
      })
    }

    function resetBackground() {
      updateCurves(null)

      if (primaryRef.current) {
        primaryRef.current.style.transform = "translate3d(0, 0, 0)"
      }

      if (secondaryRef.current) {
        secondaryRef.current.style.transform = "translate3d(0, 0, 0)"
      }
    }

    function onMouseMove(event: MouseEvent) {
      if (motionQuery.matches || !pointerQuery.matches) return

      if (frameRef.current) cancelAnimationFrame(frameRef.current)

      frameRef.current = requestAnimationFrame(() => {
        const x = event.clientX / window.innerWidth - 0.5
        const y = event.clientY / window.innerHeight - 0.5
        const cursor = {
          x: event.clientX * (viewBox.width / window.innerWidth),
          y: event.clientY * (viewBox.height / window.innerHeight),
        }

        if (primaryRef.current) {
          primaryRef.current.style.transform = `translate3d(${x * 28}px, ${
            y * 22
          }px, 0)`
        }

        if (secondaryRef.current) {
          secondaryRef.current.style.transform = `translate3d(${-x * 36}px, ${
            -y * 26
          }px, 0)`
        }

        updateCurves(cursor)
      })
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseleave", resetBackground)
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseleave", resetBackground)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [primaryLines, secondaryLines])

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-0 overflow-hidden",
        className
      )}
      style={
        {
          "--wave-duration": speedMap[speed],
          "--wave-opacity": intensityMap[intensity],
        } as CSSProperties
      }
    >
      <div ref={primaryRef} className="absolute inset-0 will-change-transform">
        <svg
          viewBox="0 0 1440 960"
          preserveAspectRatio="none"
          className="marketing-wave-field absolute inset-0 h-full w-full text-primary"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          >
            {primaryLines.map((line, index) => {
              return (
                <path
                  key={line.baseY}
                  ref={(node) => {
                    primaryPathRefs.current[index] = node
                  }}
                  d={buildWavePath(line, null, 0.58)}
                  strokeOpacity={Math.max(waveOpacity - index * 0.008, 0.05)}
                  strokeWidth={index % 3 === 0 ? 1.35 : 0.85}
                />
              )
            })}
          </g>
        </svg>
      </div>

      <div
        ref={secondaryRef}
        className="absolute inset-0 will-change-transform"
      >
        <svg
          viewBox="0 0 1440 960"
          preserveAspectRatio="none"
          className="marketing-wave-field-alt absolute inset-0 h-full w-full text-chart-2"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          >
            {secondaryLines.map((line, index) => {
              return (
                <path
                  key={line.baseY}
                  ref={(node) => {
                    secondaryPathRefs.current[index] = node
                  }}
                  d={buildWavePath(line, null, 0.44)}
                  strokeOpacity={Math.max(waveOpacity - index * 0.012, 0.04)}
                  strokeWidth={0.75}
                />
              )
            })}
          </g>
        </svg>
      </div>
    </div>
  )
}
