import commonBn from "@/constants/locales/bn/common.json"
import dashboardBn from "@/constants/locales/bn/dashboard.json"
import marketingBn from "@/constants/locales/bn/marketing.json"
import commonEn from "@/constants/locales/en/common.json"
import dashboardEn from "@/constants/locales/en/dashboard.json"
import marketingEn from "@/constants/locales/en/marketing.json"

export const defaultLocale = "en"
export const localeCookieName = "portfolio-locale"
export const locales = ["en", "bn"] as const
export type Locale = (typeof locales)[number]

export const namespaces = ["common", "marketing", "dashboard"] as const
export type Namespace = (typeof namespaces)[number]

export const resources = {
  en: {
    common: commonEn,
    marketing: marketingEn,
    dashboard: dashboardEn,
  },
  bn: {
    common: commonBn,
    marketing: marketingBn,
    dashboard: dashboardBn,
  },
} as const

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && locales.includes(value as Locale)
}
