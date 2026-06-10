import { BlogBrowser } from "@/components/marketing/blog-browser"
import { PageHero } from "@/components/marketing/page-hero"
import { getContentData } from "@/lib/data"
import { getContentLabels } from "@/lib/i18n/content-labels"
import { getI18n, getRequestLocale } from "@/lib/i18n/server"
import { Construction } from "lucide-react"

export async function BlogScreen() {
  const locale = await getRequestLocale()
  const [{ blogPosts }, { t }] = await Promise.all([
    getContentData(locale),
    getI18n(locale, "marketing"),
  ])
  const contentLabels = getContentLabels(t)

  return (
    <div className="flex h-svh flex-col items-center justify-center gap-6 text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-muted">
        <Construction className="size-8 text-muted-foreground" />
      </div>
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Under Construction
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          The books section is being built. Check back soon.
        </p>
      </div>
    </div>
  )
}
