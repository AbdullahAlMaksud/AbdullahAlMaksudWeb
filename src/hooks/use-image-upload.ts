"use client"

import * as React from "react"
import { getApiBaseUrl } from "@/lib/api-client"

export function useImageUpload() {
  const [isUploading, setIsUploading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const uploadImage = React.useCallback(async (file: File): Promise<string> => {
    setIsUploading(true)
    setError(null)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const url = `${getApiBaseUrl()}/api/v1/upload`
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        credentials: "include",
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to upload image")
      }

      setIsUploading(false)
      return data.url
    } catch (err: any) {
      const errMsg = err.message || "An error occurred during upload"
      setError(errMsg)
      setIsUploading(false)
      throw new Error(errMsg)
    }
  }, [])

  return {
    isUploading,
    error,
    uploadImage,
  }
}
