import { getApiBaseUrl } from "@/lib/api"

async function proxyAuth(request: Request) {
  const sourceUrl = new URL(request.url)
  const targetUrl = new URL(
    `${sourceUrl.pathname}${sourceUrl.search}`,
    getApiBaseUrl()
  )

  return fetch(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    duplex: "half",
    redirect: "manual",
  } as RequestInit & { duplex: "half" })
}

export const GET = proxyAuth
export const POST = proxyAuth
export const PUT = proxyAuth
export const PATCH = proxyAuth
export const DELETE = proxyAuth
