import contentBn from "@/constants/data/bn/content.json"
import dashboardBn from "@/constants/data/bn/dashboard.json"
import siteBn from "@/constants/data/bn/site.json"
import contentEn from "@/constants/data/en/content.json"
import dashboardEn from "@/constants/data/en/dashboard.json"
import siteEn from "@/constants/data/en/site.json"
import { defaultLocale, type Locale } from "@/lib/i18n/resources"
import type { ContentData, DashboardData, SiteData } from "@/types/content"

type AppData = {
  site: SiteData
  content: ContentData
  dashboard: DashboardData
}

const localData: Record<Locale, AppData> = {
  en: {
    site: siteEn as SiteData,
    content: contentEn as ContentData,
    dashboard: dashboardEn as DashboardData,
  },
  bn: {
    site: siteBn as SiteData,
    content: contentBn as ContentData,
    dashboard: dashboardBn as DashboardData,
  },
}

function source(locale: Locale) {
  return localData[locale] ?? localData[defaultLocale]
}

async function fromLocalJson<T>(data: T): Promise<T> {
  return data
}

export async function getSiteData(locale: Locale = defaultLocale) {
  return fromLocalJson(source(locale).site)
}

export async function getContentData(locale: Locale = defaultLocale) {
  return fromLocalJson(source(locale).content)
}

export async function getDashboardData(locale: Locale = defaultLocale) {
  return fromLocalJson(source(locale).dashboard)
}

export async function getBlogPostBySlug(locale: Locale, slug: string) {
  const content = await getContentData(locale)
  return content.blogPosts.find((post) => post.slug === slug)
}

export async function getAllBlogSlugs() {
  const content = await getContentData(defaultLocale)
  return content.blogPosts.map((post) => post.slug)
}
