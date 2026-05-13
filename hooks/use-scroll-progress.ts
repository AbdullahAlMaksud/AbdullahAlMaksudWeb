"use client"

import * as React from "react"

export function useScrollProgress() {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    function updateProgress() {
      const scrollTop = window.scrollY
      const height =
        document.documentElement.scrollHeight - window.innerHeight

      setProgress(height > 0 ? Math.min(scrollTop / height, 1) : 0)
    }

    updateProgress()
    window.addEventListener("scroll", updateProgress, { passive: true })
    window.addEventListener("resize", updateProgress)

    return () => {
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
    }
  }, [])

  return progress
}
