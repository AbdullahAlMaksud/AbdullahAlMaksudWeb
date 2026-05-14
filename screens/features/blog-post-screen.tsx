import { notFound } from "next/navigation"

import { BlogArticle } from "@/components/marketing/blog-article"
import { getBlogPostBySlug } from "@/lib/data"
import { getContentLabels } from "@/lib/i18n/content-labels"
import { getI18n, getRequestLocale } from "@/lib/i18n/server"

export async function BlogPostScreen({ slug }: { slug: string }) {
  const locale = await getRequestLocale()
  const [{ t }, post] = await Promise.all([
    getI18n(locale, "marketing"),
    getBlogPostBySlug(locale, slug),
  ])

  if (!post) {
    notFound()
  }

  const labels = getContentLabels(t)

  return (
    <BlogArticle
      category={labels.blogCategories[post.category]}
      labels={{ toc: t("article.toc") }}
      post={post}
    />
  )
}
