import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"

import { MotionSection } from "@/components/common/motion-section"
import { SectionHeading } from "@/components/common/section-heading"
import { SpotlightCard } from "@/components/common/spotlight-card"
import { Badge } from "@/components/ui/badge"
import type { BlogPost } from "@/types/content"

export function LatestBlogSection({
  blogPosts,
  labels,
}: {
  blogPosts: BlogPost[]
  labels: {
    eyebrow: string
    title: string
    description: string
    read: string
    categories: Record<BlogPost["category"], string>
  }
}) {
  return (
    <MotionSection className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading
        eyebrow={labels.eyebrow}
        title={labels.title}
        description={labels.description}
      />
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {blogPosts.map((post) => (
          <SpotlightCard key={post.id}>
            <article className="p-4">
              <Image
                src={post.image}
                alt={`${post.title} article artwork`}
                width={1000}
                height={650}
                className="aspect-[16/10] rounded-2xl object-cover"
              />
              <div className="mt-5 flex items-center gap-3">
                <Badge variant="secondary">{labels.categories[post.category]}</Badge>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  {post.readTime}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold leading-tight">
                {post.title}
              </h3>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                {labels.read} <ArrowRight className="size-4" />
              </Link>
            </article>
          </SpotlightCard>
        ))}
      </div>
    </MotionSection>
  )
}
