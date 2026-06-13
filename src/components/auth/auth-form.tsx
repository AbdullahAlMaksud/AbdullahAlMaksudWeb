"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { type FormEvent, useState } from "react"
import { Loader2, LogIn, UserPlus } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL

export type AuthFormLabels = {
  title: string
  description: string
  name: string
  namePlaceholder: string
  email: string
  emailPlaceholder: string
  password: string
  passwordPlaceholder: string
  submit: string
  submitting: string
  switchText: string
  switchLink: string
  success: string
  genericError: string
  googleSignIn?: string
  orDivider?: string
}

export function AuthForm({
  labels,
  mode,
}: {
  labels: AuthFormLabels
  mode: "login" | "signup"
}) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const isSignup = mode === "signup"
  const Icon = isSignup ? UserPlus : LogIn

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")
    const name = String(formData.get("name") ?? "").trim()

    try {
      const response = isSignup
        ? await authClient.signUp.email({
            email,
            name,
            password,
          })
        : await authClient.signIn.email({
            email,
            password,
          })

      if (response.error) {
        toast.error(response.error.message || labels.genericError)
        return
      }

      const sessionResponse = await fetch(`${apiBaseUrl}/api/me`, {
        credentials: "include",
      })
      const session = sessionResponse.ok
        ? ((await sessionResponse.json()) as {
            data?: { user?: { role?: string | null } }
          })
        : null
      const nextPath =
        session?.data?.user?.role === "admin" ? "/dashboard" : "/"

      toast.success(labels.success)
      router.push(nextPath)
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : labels.genericError)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleGoogleSignIn() {
    setIsGoogleLoading(true)
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
        errorCallbackURL: isSignup ? "/signup" : "/login",
      })
    } catch {
      toast.error(labels.genericError)
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="premium-border glass-panel rounded-2xl p-6 shadow-2xl shadow-primary/10">
        <div className="mb-6">
          <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Icon className="size-5" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {labels.title}
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {labels.description}
          </p>
        </div>
        <div className="grid gap-4">
          {labels.googleSignIn && (
            <Button
              type="button"
              variant="outline"
              className="h-10 w-full rounded-xl"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading || isSubmitting}
            >
              {isGoogleLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <svg className="size-4" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              )}
              {labels.googleSignIn}
            </Button>
          )}
          {labels.googleSignIn && (
            <div className="relative flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">
                {labels.orDivider ?? "or"}
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
          )}
          <form className="grid gap-4" onSubmit={handleSubmit}>
            {isSignup && (
              <div className="grid gap-2">
                <Label htmlFor="name">{labels.name}</Label>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder={labels.namePlaceholder}
                  required
                />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">{labels.email}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={labels.emailPlaceholder}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">{labels.password}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete={isSignup ? "new-password" : "current-password"}
                minLength={8}
                placeholder={labels.passwordPlaceholder}
                required
              />
            </div>
            <Button
              type="submit"
              className="mt-2 h-10 rounded-xl"
              disabled={isSubmitting || isGoogleLoading}
            >
              {isSubmitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Icon className="size-4" />
              )}
              {isSubmitting ? labels.submitting : labels.submit}
            </Button>
          </form>
        </div>
      </div>
      <p className="mt-5 text-center text-sm text-muted-foreground">
        {labels.switchText}{" "}
        <Link
          href={isSignup ? "/login" : "/signup"}
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          {labels.switchLink}
        </Link>
      </p>
    </div>
  )
}
