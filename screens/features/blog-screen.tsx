import { BlogBrowser } from "@/components/marketing/blog-browser"
import { PageHero } from "@/components/marketing/page-hero"

export function BlogScreen() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Field notes on frontend systems, writing, and interface craft."
        description="Browse essays by topic, reading time, and practical focus."
      />
      <main className="mx-auto max-w-7xl px-4 pb-20">
        <BlogBrowser />
      </main>
    </>
  )
}
