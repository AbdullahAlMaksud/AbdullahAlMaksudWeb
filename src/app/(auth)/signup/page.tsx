import type { Metadata } from "next"

import { AuthForm } from "@/components/auth/auth-form"
import { getI18n, getRequestLocale } from "@/lib/i18n/server"

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n(await getRequestLocale(), "common")

  return {
    title: t("auth.signup.title"),
  }
}

export default async function SignupPage() {
  const { t } = await getI18n(await getRequestLocale(), "common")

  return (
    <AuthForm
      mode="signup"
      labels={{
        title: t("auth.signup.title"),
        description: t("auth.signup.description"),
        name: t("auth.fields.name"),
        namePlaceholder: t("auth.fields.namePlaceholder"),
        email: t("auth.fields.email"),
        emailPlaceholder: t("auth.fields.emailPlaceholder"),
        password: t("auth.fields.password"),
        passwordPlaceholder: t("auth.fields.passwordPlaceholder"),
        submit: t("auth.signup.submit"),
        submitting: t("auth.signup.submitting"),
        switchText: t("auth.signup.switchText"),
        switchLink: t("auth.signup.switchLink"),
        success: t("auth.signup.success"),
        genericError: t("auth.genericError"),
        googleSignIn: t("auth.googleSignIn"),
        orDivider: t("auth.orDivider"),
      }}
    />
  )
}
