import "i18next"

import type { defaultLocale, resources } from "@/lib/i18n/resources"

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common"
    resources: (typeof resources)[typeof defaultLocale]
  }
}
