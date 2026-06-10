import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { MotionSection } from "@/components/common/motion-section"
import { SectionHeading } from "@/components/common/section-heading"
import { SpotlightCard } from "@/components/common/spotlight-card"
import { Progress } from "@/components/ui/progress"
import type { Book } from "@/types/content"

export function BooksSection({
  books,
  labels,
}: {
  books: Book[]
  labels: {
    eyebrow: string
    title: string
    description: string
    browse: string
    complete: (value: number) => string
  }
}) {
  return (
    <MotionSection className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <SectionHeading
          eyebrow={labels.eyebrow}
          title={labels.title}
          description={labels.description}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {books.map((book) => (
            <SpotlightCard key={book.id}>
              <div className="p-4">
                <Image
                  src={book.cover}
                  alt={`${book.title} book cover`}
                  width={700}
                  height={1000}
                  className="mx-auto aspect-[7/10] max-h-72 rounded-2xl object-cover shadow-xl"
                />
                <h3 className="mt-4 font-semibold">{book.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {book.subtitle}
                </p>
                <Progress value={book.progress} className="mt-4" />
                <p className="mt-2 text-xs text-muted-foreground">
                  {labels.complete(book.progress)}
                </p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
      <Link
        href="/books"
        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary"
      >
        {labels.browse} <ArrowRight className="size-4" />
      </Link>
    </MotionSection>
  )
}
