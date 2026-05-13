"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock, Search } from "lucide-react"

import { EmptyState } from "@/components/common/empty-state"
import { SpotlightCard } from "@/components/common/spotlight-card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { blogPosts } from "@/constants/mock-data"
import type { BlogCategory } from "@/types/content"

const categories: BlogCategory[] = ["All", "Engineering", "Writing", "Design"]

export function BlogBrowser() {
  const [category, setCategory] = React.useState<BlogCategory>("All")
  const [query, setQuery] = React.useState("")
  const featured = blogPosts.find((post) => post.featured) ?? blogPosts[0]

  const filtered = blogPosts.filter((post) => {
    const matchesCategory = category === "All" || post.category === category
    const haystack = `${post.title} ${post.excerpt} ${post.tags.join(" ")}`
    return matchesCategory && haystack.toLowerCase().includes(query.toLowerCase())
  })

  return (
    <div className="space-y-8">
      <SpotlightCard>
        <article className="grid gap-6 p-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Image
            src={featured.image}
            alt={`${featured.title} featured article artwork`}
            width={1000}
            height={650}
            className="aspect-[16/10] rounded-2xl object-cover"
          />
          <div className="p-1">
            <Badge className="rounded-full">Featured Article</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              {featured.title}
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {featured.excerpt}
            </p>
            <div className="mt-5 flex items-center gap-3 text-sm text-muted-foreground">
              <span>{featured.date}</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-4" />
                {featured.readTime}
              </span>
            </div>
            <Link
              href={`/blog/${featured.slug}`}
              className="mt-6 inline-flex items-center gap-2 font-semibold text-primary"
            >
              Read featured essay <ArrowRight className="size-4" />
            </Link>
          </div>
        </article>
      </SpotlightCard>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Tabs value={category} onValueChange={(value) => setCategory(value as BlogCategory)}>
          <TabsList className="w-full overflow-x-auto rounded-xl bg-muted/70 p-1 lg:w-fit">
            {categories.map((item) => (
              <TabsTrigger key={item} value={item} className="min-w-24">
                {item}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="relative w-full lg:max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search writing..."
            className="h-11 rounded-xl pl-10"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No posts found" description="Try another topic." />
      ) : (
        <div className="grid gap-5 md:grid-cols-3">
          {filtered.map((post) => (
            <SpotlightCard key={post.id}>
              <article className="p-4">
                <Image
                  src={post.image}
                  alt={`${post.title} article artwork`}
                  width={1000}
                  height={650}
                  className="aspect-[16/10] rounded-2xl object-cover"
                />
                <Badge variant="secondary" className="mt-5">
                  {post.category}
                </Badge>
                <h3 className="mt-3 text-xl font-semibold leading-tight">
                  {post.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  Read more <ArrowRight className="size-4" />
                </Link>
              </article>
            </SpotlightCard>
          ))}
        </div>
      )}
    </div>
  )
}
