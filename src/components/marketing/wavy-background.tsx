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

export function WavyBackground({
  className,
  intensity = "medium",
  speed = "slow",
}: WavyBackgroundProps) {
  const waveOpacity = intensityMap[intensity]

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
          {Array.from({ length: 12 }).map((_, index) => {
            const y = 70 + index * 74

            return (
              <path
                key={y}
                d={`M -120 ${y} C 120 ${y - 90} 280 ${y + 88} 520 ${y} S 900 ${
                  y - 86
                } 1160 ${y + 4} S 1540 ${y + 84} 1680 ${y - 8}`}
                strokeOpacity={Math.max(waveOpacity - index * 0.008, 0.05)}
                strokeWidth={index % 3 === 0 ? 1.35 : 0.85}
              />
            )
          })}
        </g>
      </svg>

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
          {Array.from({ length: 8 }).map((_, index) => {
            const y = 120 + index * 106

            return (
              <path
                key={y}
                d={`M -160 ${y} C 140 ${y + 96} 360 ${y - 92} 620 ${y + 6} S 980 ${
                  y + 94
                } 1220 ${y - 2} S 1560 ${y - 96} 1700 ${y + 18}`}
                strokeOpacity={Math.max(waveOpacity - index * 0.012, 0.04)}
                strokeWidth={0.75}
              />
            )
          })}
        </g>
      </svg>
    </div>
  )
}
