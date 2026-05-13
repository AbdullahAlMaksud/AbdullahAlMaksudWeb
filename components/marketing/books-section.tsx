import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { MotionSection } from "@/components/common/motion-section"
import { SectionHeading } from "@/components/common/section-heading"
import { SpotlightCard } from "@/components/common/spotlight-card"
import { Progress } from "@/components/ui/progress"
import { books } from "@/constants/mock-data"

export function BooksSection() {
  return (
    <MotionSection className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <SectionHeading
          eyebrow="Books"
          title="Long-form projects with a working rhythm."
          description="Books in progress, published notes, and collections that turn scattered ideas into durable references."
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
                  {book.progress}% complete
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
        Browse books <ArrowRight className="size-4" />
      </Link>
    </MotionSection>
  )
}
