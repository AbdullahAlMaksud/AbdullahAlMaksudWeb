"use client"

import * as React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import type { PortfolioProject } from "@/types/content"

export function ProjectLivePreview({
  className,
  imageClassName,
  interactive = false,
  project,
}: {
  className?: string
  imageClassName?: string
  interactive?: boolean
  project: PortfolioProject
}) {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [showFallback, setShowFallback] = React.useState(false)
  const isLoadedRef = React.useRef(false)

  React.useEffect(() => {
    isLoadedRef.current = false
    setIsLoaded(false)
    setShowFallback(false)

    const timeout = window.setTimeout(() => {
      setShowFallback((current) => current || !isLoadedRef.current)
    }, 4500)

    return () => window.clearTimeout(timeout)
  }, [project.liveLink])

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      <Image
        src={project.coverImage}
        alt={project.title}
        fill
        sizes="100vw"
        className={cn(
          "object-cover object-top transition duration-500",
          isLoaded && !showFallback ? "opacity-0" : "opacity-100",
          imageClassName
        )}
        priority
      />
      {!showFallback && (
        <iframe
          src={project.liveLink}
          title={`${project.title} live preview`}
          className={cn(
            "absolute inset-0 h-full w-full border-0 bg-background transition duration-500",
            isLoaded ? "opacity-100" : "opacity-0",
            !interactive && "pointer-events-none"
          )}
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          onLoad={() => {
            isLoadedRef.current = true
            setIsLoaded(true)
          }}
          onError={() => setShowFallback(true)}
        />
      )}
    </div>
  )
}
