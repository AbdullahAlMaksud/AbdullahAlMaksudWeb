import { defaultLocale, type Locale } from "@/lib/i18n/resources"
import {
  localContentData,
  localDashboardData,
  localSiteData,
} from "@/lib/local-data"

export async function getSiteData(locale: Locale = defaultLocale) {
  return localSiteData[locale]
}

export async function getContentData(locale: Locale = defaultLocale) {
  return localContentData[locale]
}

export async function getDashboardData(locale: Locale = defaultLocale) {
  return localDashboardData[locale]
}

export async function getBlogPostBySlug(locale: Locale, slug: string) {
  return localContentData[locale].blogPosts.find((post) => post.slug === slug)
}

export async function getAllBlogSlugs() {
  const content = await getContentData(defaultLocale)
  return content.blogPosts.map((post) => post.slug)
}
