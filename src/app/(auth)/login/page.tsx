import type { Metadata } from "next"

import { AuthForm } from "@/components/auth/auth-form"
import { getI18n, getRequestLocale } from "@/lib/i18n/server"

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n(await getRequestLocale(), "common")

  return {
    title: t("auth.login.title"),
  }
}

export default async function LoginPage() {
  const { t } = await getI18n(await getRequestLocale(), "common")

  return (
    <AuthForm
      mode="login"
      labels={{
        title: t("auth.login.title"),
        description: t("auth.login.description"),
        name: t("auth.fields.name"),
        namePlaceholder: t("auth.fields.namePlaceholder"),
        email: t("auth.fields.email"),
        emailPlaceholder: t("auth.fields.emailPlaceholder"),
        password: t("auth.fields.password"),
        passwordPlaceholder: t("auth.fields.passwordPlaceholder"),
        submit: t("auth.login.submit"),
        submitting: t("auth.login.submitting"),
        switchText: t("auth.login.switchText"),
        switchLink: t("auth.login.switchLink"),
        success: t("auth.login.success"),
        genericError: t("auth.genericError"),
        googleSignIn: t("auth.googleSignIn"),
        orDivider: t("auth.orDivider"),
      }}
    />
  )
}
