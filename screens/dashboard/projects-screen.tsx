import Image from "next/image"
import { Plus } from "lucide-react"

import { DataTable, type DataTableColumn } from "@/components/dashboard/data-table"
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { projects } from "@/constants/mock-data"
import type { Project } from "@/types/content"

const columns: DataTableColumn<Project>[] = [
  {
    key: "project",
    header: "Project",
    cell: (project) => (
      <div className="flex items-center gap-3">
        <Image
          src={project.image}
          alt=""
          width={80}
          height={54}
          className="h-12 w-16 rounded-xl object-cover"
        />
        <div>
          <p className="font-medium">{project.title}</p>
          <p className="text-xs text-muted-foreground">{project.category}</p>
        </div>
      </div>
    ),
  },
  { key: "status", header: "Status", cell: (project) => <Badge>{project.status}</Badge> },
  { key: "year", header: "Year", cell: (project) => project.year },
  {
    key: "stack",
    header: "Stack",
    cell: (project) => project.stack.slice(0, 3).join(", "),
  },
]

export function DashboardProjectsScreen() {
  return (
    <>
      <DashboardPageHeader
        title="Projects"
        description="Manage portfolio projects, stack labels, and publishing status."
        action={
          <Button className="rounded-xl">
            <Plus className="size-4" />
            New Project
          </Button>
        }
      />
      <DataTable columns={columns} data={projects} />
    </>
  )
}
