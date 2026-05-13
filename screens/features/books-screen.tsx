import { BookBrowser } from "@/components/marketing/book-browser"
import { PageHero } from "@/components/marketing/page-hero"

export function BooksScreen() {
  return (
    <>
      <PageHero
        eyebrow="Books"
        title="Published and in-progress books for thoughtful builders."
        description="A compact library with reading progress, tags, status labels, and detail sheets."
      />
      <main className="mx-auto max-w-7xl px-4 pb-20">
        <BookBrowser />
      </main>
    </>
  )
}
