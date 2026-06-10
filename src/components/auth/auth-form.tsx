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

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ??
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL ??
  "http://localhost:4000"

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
      const nextPath = session?.data?.user?.role === "admin" ? "/dashboard" : "/"

      toast.success(labels.success)
      router.push(nextPath)
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : labels.genericError)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="premium-border glass-panel rounded-2xl p-6 shadow-2xl shadow-primary/10">
        <div className="mb-6">
          <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Icon className="size-5" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">{labels.title}</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {labels.description}
          </p>
        </div>
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
          <Button type="submit" className="mt-2 h-10 rounded-xl" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Icon className="size-4" />
            )}
            {isSubmitting ? labels.submitting : labels.submit}
          </Button>
        </form>
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
