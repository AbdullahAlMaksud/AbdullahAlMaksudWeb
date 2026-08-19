import type { LocaleParam } from "./type";

export const dataKeys = {
  all: ["data"] as const,
  site: (locale?: LocaleParam) => [...dataKeys.all, "site", locale || "en"] as const,
  content: (locale?: LocaleParam) => [...dataKeys.all, "content", locale || "en"] as const,
};
