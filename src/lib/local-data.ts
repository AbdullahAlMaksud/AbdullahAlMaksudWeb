import contentBn from "@/constants/data/bn/content.json"
import dashboardBn from "@/constants/data/bn/dashboard.json"
import siteBn from "@/constants/data/bn/site.json"
import contentEn from "@/constants/data/en/content.json"
import dashboardEn from "@/constants/data/en/dashboard.json"
import siteEn from "@/constants/data/en/site.json"
import type { Locale } from "@/lib/i18n/resources"
import type { ContentData, DashboardData, SiteData } from "@/types/content"

export const localSiteData: Record<Locale, SiteData> = {
  en: siteEn as SiteData,
  bn: siteBn as SiteData,
}

export const localContentData: Record<Locale, ContentData> = {
  en: contentEn as ContentData,
  bn: contentBn as ContentData,
}

export const localDashboardData: Record<Locale, DashboardData> = {
  en: dashboardEn as DashboardData,
  bn: dashboardBn as DashboardData,
}
