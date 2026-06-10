"use client"

import * as React from "react"
import Image from "next/image"
import { BookOpen, Search } from "lucide-react"

import { EmptyState } from "@/components/common/empty-state"
import { SpotlightCard } from "@/components/common/spotlight-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import type { Book } from "@/types/content"

export function BookBrowser({
  books,
  labels,
}: {
  books: Book[]
  labels: {
    search: string
    emptyTitle: string
    emptyDescription: string
    details: string
    completeTemplate: string
    status: Record<Book["status"], string>
  }
}) {
  const [query, setQuery] = React.useState("")
  const [selected, setSelected] = React.useState<Book | null>(null)
  const filtered = books.filter((book) => {
    const haystack = `${book.title} ${book.subtitle} ${book.tags.join(" ")}`
    return haystack.toLowerCase().includes(query.toLowerCase())
  })

  return (
    <div className="space-y-6">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={labels.search}
          className="h-11 rounded-xl pl-10"
        />
      </div>
      {filtered.length === 0 ? (
        <EmptyState
          title={labels.emptyTitle}
          description={labels.emptyDescription}
          icon={BookOpen}
        />
      ) : (
        <div className="grid gap-5 md:grid-cols-3">
          {filtered.map((book) => (
            <SpotlightCard key={book.id}>
              <div className="p-5">
                <Image
                  src={book.cover}
                  alt={`${book.title} cover`}
                  width={700}
                  height={1000}
                  className="mx-auto aspect-[7/10] max-h-96 rounded-2xl object-cover shadow-2xl"
                />
                <div className="mt-5 flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold">{book.title}</h3>
                  <Badge variant="secondary">{labels.status[book.status]}</Badge>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {book.subtitle}
                </p>
                <Progress value={book.progress} className="mt-4" />
                <div className="mt-4 flex flex-wrap gap-2">
                  {book.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <Button
                  className="mt-5 w-full rounded-xl"
                  onClick={() => setSelected(book)}
                >
                  {labels.details}
                </Button>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}
      <Sheet open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="overflow-y-auto sm:max-w-md">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.title}</SheetTitle>
                <SheetDescription>{selected.subtitle}</SheetDescription>
              </SheetHeader>
              <div className="px-4 pb-6">
                <Image
                  src={selected.cover}
                  alt={`${selected.title} cover`}
                  width={700}
                  height={1000}
                  className="mx-auto aspect-[7/10] max-h-[520px] rounded-2xl object-cover"
                />
                <p className="mt-5 text-sm leading-7 text-muted-foreground">
                  {selected.summary}
                </p>
                <Progress value={selected.progress} className="mt-5" />
                <p className="mt-2 text-sm text-muted-foreground">
                  {formatComplete(labels.completeTemplate, selected.progress)}
                </p>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

function formatComplete(template: string, value: number) {
  return template.replace("{value}", String(value))
}
