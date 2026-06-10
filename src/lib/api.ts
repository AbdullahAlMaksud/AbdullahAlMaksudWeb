import { headers } from "next/headers"

const defaultApiUrl = "http://localhost:4000"

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message)
  }
}

export function getApiBaseUrl() {
  return (
    process.env.BACKEND_API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ??
    defaultApiUrl
  ).replace(/\/$/, "")
}

export async function fetchApi<T>(
  path: string,
  options: {
    authenticated?: boolean
    revalidate?: number
  } = {}
) {
  const requestHeaders = new Headers({
    Accept: "application/json",
  })

  if (options.authenticated) {
    const cookie = (await headers()).get("cookie")

    if (cookie) {
      requestHeaders.set("cookie", cookie)
    }
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    headers: requestHeaders,
    credentials: "include",
    ...(options.authenticated
      ? { cache: "no-store" as const }
      : { next: { revalidate: options.revalidate ?? 60 } }),
  })

  if (!response.ok) {
    throw new ApiError(`API request failed: ${response.status}`, response.status)
  }

  return response.json() as Promise<T>
}
