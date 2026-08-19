import { getRequest } from "../api-client";
import type { ContentBundleData, LocaleParam, SiteData } from "./type";

/**
 * Fetch portfolio site metadata and navigation bundle
 */
export async function getSiteDataApi(locale: LocaleParam = "en"): Promise<SiteData> {
  return getRequest<SiteData>("/api/v1/site", { params: { locale } });
}

/**
 * Fetch portfolio static content bundle
 */
export async function getContentDataApi(locale: LocaleParam = "en"): Promise<ContentBundleData> {
  return getRequest<ContentBundleData>("/api/v1/content", { params: { locale } });
}
