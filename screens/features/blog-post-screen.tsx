import { notFound } from "next/navigation"

import { BlogArticle } from "@/components/marketing/blog-article"
import { blogPosts } from "@/constants/mock-data"

export function BlogPostScreen({ slug }: { slug: string }) {
  const post = blogPosts.find((item) => item.slug === slug)

  if (!post) {
    notFound()
  }

  return <BlogArticle post={post} />
}
