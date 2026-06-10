import "server-only"

import i18next, { type TOptions } from "i18next"
import { cookies } from "next/headers"

import {
  defaultLocale,
  isLocale,
  localeCookieName,
  namespaces,
  resources,
  type Locale,
  type Namespace,
} from "@/lib/i18n/resources"

export type AppTranslator = (key: string, options?: TOptions) => string

export async function getRequestLocale(): Promise<Locale> {
  const value = (await cookies()).get(localeCookieName)?.value
  return isLocale(value) ? value : defaultLocale
}

export async function getI18n(
  locale?: Locale,
  ns: Namespace | readonly Namespace[] = namespaces
): Promise<{ locale: Locale; t: AppTranslator }> {
  const activeLocale = locale ?? (await getRequestLocale())
  const activeNamespaces = Array.isArray(ns) ? [...ns] : ns
  const defaultNamespace = Array.isArray(activeNamespaces)
    ? activeNamespaces[0]
    : activeNamespaces
  const instance = i18next.createInstance()

  await instance.init({
    lng: activeLocale,
    fallbackLng: defaultLocale,
    defaultNS: defaultNamespace,
    ns: activeNamespaces,
    resources,
    interpolation: {
      escapeValue: false,
    },
  })

  return {
    locale: activeLocale,
    t: instance.t.bind(instance) as AppTranslator,
  }
}
