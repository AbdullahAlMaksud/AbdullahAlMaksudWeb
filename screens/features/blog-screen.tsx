import { BlogBrowser } from "@/components/marketing/blog-browser"
import { PageHero } from "@/components/marketing/page-hero"
import { getContentData } from "@/lib/data"
import { getContentLabels } from "@/lib/i18n/content-labels"
import { getI18n, getRequestLocale } from "@/lib/i18n/server"

export async function BlogScreen() {
  const locale = await getRequestLocale()
  const [{ blogPosts }, { t }] = await Promise.all([
    getContentData(locale),
    getI18n(locale, "marketing"),
  ])
  const contentLabels = getContentLabels(t)

  return (
    <>
      <PageHero
        eyebrow={t("pages.blog.eyebrow")}
        title={t("pages.blog.hero")}
        description={t("pages.blog.description")}
      />
      <main className="mx-auto max-w-7xl px-4 pb-20">
        <BlogBrowser
          blogPosts={blogPosts}
          labels={{
            categories: contentLabels.blogCategories,
            search: t("browser.searchWriting"),
            featured: t("browser.featuredArticle"),
            readFeatured: t("browser.readFeatured"),
            readMore: t("browser.readMore"),
            emptyTitle: t("browser.noPosts"),
            emptyDescription: t("browser.noPostsDescription"),
          }}
        />
      </main>
    </>
  )
}
