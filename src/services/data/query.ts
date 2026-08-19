import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getContentDataApi, getSiteDataApi } from "./api";
import { dataKeys } from "./query-key";
import type { ContentBundleData, LocaleParam, SiteData } from "./type";

/**
 * Hook to query site data (navigation, social, meta)
 */
export function useSiteDataQuery(
  locale: LocaleParam = "en",
  options?: Omit<UseQueryOptions<SiteData, Error>, "queryKey" | "queryFn">
) {
  return useQuery<SiteData, Error>({
    queryKey: dataKeys.site(locale),
    queryFn: () => getSiteDataApi(locale),
    ...options,
  });
}

/**
 * Hook to query portfolio content bundle
 */
export function useContentDataQuery(
  locale: LocaleParam = "en",
  options?: Omit<UseQueryOptions<ContentBundleData, Error>, "queryKey" | "queryFn">
) {
  return useQuery<ContentBundleData, Error>({
    queryKey: dataKeys.content(locale),
    queryFn: () => getContentDataApi(locale),
    ...options,
  });
}
