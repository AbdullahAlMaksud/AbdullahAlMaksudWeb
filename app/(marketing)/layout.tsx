import type { ReactNode } from "react"

import { ScrollProgress } from "@/components/common/scroll-progress"
import { SiteNavbar } from "@/components/marketing/site-navbar"

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10 min-h-svh">
      <ScrollProgress />
      <SiteNavbar />
      {children}
    </div>
  )
}
