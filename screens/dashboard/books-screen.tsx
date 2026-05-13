import Image from "next/image"
import { BookPlus } from "lucide-react"

import { DataTable, type DataTableColumn } from "@/components/dashboard/data-table"
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { books } from "@/constants/mock-data"
import type { Book } from "@/types/content"

const columns: DataTableColumn<Book>[] = [
  {
    key: "book",
    header: "Book",
    cell: (book) => (
      <div className="flex items-center gap-3">
        <Image
          src={book.cover}
          alt=""
          width={56}
          height={80}
          className="h-14 w-10 rounded-lg object-cover"
        />
        <div>
          <p className="font-medium">{book.title}</p>
          <p className="text-xs text-muted-foreground">{book.subtitle}</p>
        </div>
      </div>
    ),
  },
  { key: "status", header: "Status", cell: (book) => <Badge>{book.status}</Badge> },
  {
    key: "progress",
    header: "Progress",
    cell: (book) => (
      <div className="w-40">
        <Progress value={book.progress} />
        <p className="mt-1 text-xs text-muted-foreground">{book.progress}%</p>
      </div>
    ),
  },
  { key: "tags", header: "Tags", cell: (book) => book.tags.join(", ") },
]

export function DashboardBooksScreen() {
  return (
    <>
      <DashboardPageHeader
        title="Books"
        description="Track long-form publishing projects and reading progress."
        action={
          <Button className="rounded-xl">
            <BookPlus className="size-4" />
            Add Book
          </Button>
        }
      />
      <DataTable columns={columns} data={books} />
    </>
  )
}
