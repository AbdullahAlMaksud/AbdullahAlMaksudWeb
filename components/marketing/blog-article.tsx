import Image from "next/image"
import { Clock } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { BlogPost } from "@/types/content"

export function BlogArticle({
  category,
  labels,
  post,
}: {
  category: string
  labels: {
    toc: string
  }
  post: BlogPost
}) {
  return (
    <article className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-[1fr_280px]">
      <div className="min-w-0">
        <Badge className="rounded-full">{category}</Badge>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-balance md:text-6xl">
          {post.title}
        </h1>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span>{post.date}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-4" />
            {post.readTime}
          </span>
        </div>
        <Image
          src={post.image}
          alt={`${post.title} article artwork`}
          width={1000}
          height={650}
          className="mt-8 aspect-[16/9] rounded-3xl object-cover premium-border"
        />
        <div className="mt-10 space-y-10">
          {post.content.map((section) => (
            <section
              key={section.heading}
              id={slugify(section.heading)}
              className="scroll-mt-24"
            >
              <h2 className="text-2xl font-semibold tracking-tight">
                {section.heading}
              </h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                {section.body}
              </p>
              {section.code && (
                <pre className="mt-5 overflow-x-auto rounded-2xl border bg-muted/70 p-5 text-sm">
                  <code>{section.code}</code>
                </pre>
              )}
            </section>
          ))}
        </div>
      </div>
      <aside className="hidden lg:block">
        <div className="sticky top-28 rounded-2xl border bg-card/70 p-5 backdrop-blur">
          <p className="text-sm font-semibold">{labels.toc}</p>
          <Separator className="my-4" />
          <nav className="grid gap-3">
            {post.content.map((section) => (
              <a
                key={section.heading}
                href={`#${slugify(section.heading)}`}
                className="text-sm text-muted-foreground transition hover:text-primary"
              >
                {section.heading}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </article>
  )
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}
