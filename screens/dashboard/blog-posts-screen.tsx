import Image from "next/image"
import { PenSquare } from "lucide-react"

import { DataTable, type DataTableColumn } from "@/components/dashboard/data-table"
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { blogPosts } from "@/constants/mock-data"
import type { BlogPost } from "@/types/content"

const columns: DataTableColumn<BlogPost>[] = [
  {
    key: "post",
    header: "Post",
    cell: (post) => (
      <div className="flex items-center gap-3">
        <Image
          src={post.image}
          alt=""
          width={80}
          height={54}
          className="h-12 w-16 rounded-xl object-cover"
        />
        <div>
          <p className="font-medium">{post.title}</p>
          <p className="text-xs text-muted-foreground">{post.readTime}</p>
        </div>
      </div>
    ),
  },
  { key: "category", header: "Category", cell: (post) => <Badge>{post.category}</Badge> },
  { key: "date", header: "Date", cell: (post) => post.date },
  { key: "tags", header: "Tags", cell: (post) => post.tags.join(", ") },
]

export function DashboardBlogPostsScreen() {
  return (
    <>
      <DashboardPageHeader
        title="Blog Posts"
        description="A mock editorial list for published and upcoming writing."
        action={
          <Button className="rounded-xl">
            <PenSquare className="size-4" />
            Write Blog
          </Button>
        }
      />
      <DataTable columns={columns} data={blogPosts} />
    </>
  )
}
