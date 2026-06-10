import { NextResponse } from "next/server"

import { isLocale, localeCookieName } from "@/lib/i18n/resources"

export async function POST(request: Request) {
  const body = (await request.json()) as { locale?: unknown }

  if (!isLocale(body.locale)) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(localeCookieName, body.locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  })

  return response
}
