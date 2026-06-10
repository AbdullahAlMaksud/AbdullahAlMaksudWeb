import { redirect } from "next/navigation"

import { ApiError, fetchApi } from "@/lib/api"

export type AuthRole = "admin" | "user"

export type AuthUser = {
  id: string
  name: string
  email: string
  image?: string | null
  role?: AuthRole | string | null
}

type CurrentSessionResponse = {
  success: boolean
  data: {
    user: AuthUser
    session: unknown
  }
}

export async function getCurrentSession() {
  try {
    return await fetchApi<CurrentSessionResponse>("/api/me", {
      authenticated: true,
    })
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return null
    }

    throw error
  }
}

export async function requireAdmin() {
  const currentSession = await getCurrentSession()

  if (!currentSession?.data.user) {
    redirect("/login")
  }

  if (currentSession.data.user.role !== "admin") {
    redirect("/")
  }

  return currentSession.data.user
}
