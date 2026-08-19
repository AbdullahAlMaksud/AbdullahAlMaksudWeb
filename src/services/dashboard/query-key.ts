import type { LocaleParam } from "../data/type";

export const dashboardKeys = {
  all: ["dashboard"] as const,
  overview: (locale?: LocaleParam) => [...dashboardKeys.all, "overview", locale || "en"] as const,
  messages: (locale?: LocaleParam) => [...dashboardKeys.all, "messages", locale || "en"] as const,
  notifications: (locale?: LocaleParam) =>
    [...dashboardKeys.all, "notifications", locale || "en"] as const,
};
