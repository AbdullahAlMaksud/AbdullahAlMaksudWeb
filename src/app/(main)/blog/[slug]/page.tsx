import type { Metadata } from "next"

import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/data"
import { getI18n, getRequestLocale } from "@/lib/i18n/server"
import { BlogPostScreen } from "@/screens/features/blog-post-screen"

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const locale = await getRequestLocale()
  const [{ t }, post] = await Promise.all([
    getI18n(locale, "common"),
    getBlogPostBySlug(locale, slug),
  ])

  return {
    title: post?.title ?? t("meta.blogPost"),
    description: post?.excerpt,
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return <BlogPostScreen slug={slug} />
}
