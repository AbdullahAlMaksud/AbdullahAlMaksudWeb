import type { Metadata } from "next"

import { blogPosts } from "@/constants/mock-data"
import { BlogPostScreen } from "@/screens/features/blog-post-screen"

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((item) => item.slug === slug)

  return {
    title: post?.title ?? "Blog Post",
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
