"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Code2, ExternalLink, Search } from "lucide-react"

import { EmptyState } from "@/components/common/empty-state"
import { SpotlightCard } from "@/components/common/spotlight-card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Project, ProjectCategory } from "@/types/content"

const categories: ProjectCategory[] = ["all", "saas", "writing", "ai", "motion"]

export function ProjectBrowser({
  labels,
  projects,
}: {
  labels: {
    categories: Record<ProjectCategory, string>
    status: Record<Project["status"], string>
    search: string
    emptyTitle: string
    emptyDescription: string
    demo: string
    code: string
  }
  projects: Project[]
}) {
  const [category, setCategory] = React.useState<ProjectCategory>("all")
  const [query, setQuery] = React.useState("")

  const filtered = projects.filter((project) => {
    const matchesCategory = category === "all" || project.category === category
    const haystack = `${project.title} ${project.description} ${project.stack.join(" ")}`
    return matchesCategory && haystack.toLowerCase().includes(query.toLowerCase())
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Tabs value={category} onValueChange={(value) => setCategory(value as ProjectCategory)}>
          <TabsList className="w-full overflow-x-auto rounded-xl bg-muted/70 p-1 lg:w-fit">
            {categories.map((item) => (
              <TabsTrigger key={item} value={item} className="min-w-20">
                {labels.categories[item]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="relative w-full lg:max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.search}
            className="h-11 rounded-xl pl-10"
          />
        </div>
      </div>
      {filtered.length === 0 ? (
        <EmptyState
          title={labels.emptyTitle}
          description={labels.emptyDescription}
        />
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((project) => (
            <SpotlightCard key={project.id}>
              <div className="p-4">
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  width={1200}
                  height={800}
                  className="aspect-[16/10] rounded-2xl object-cover"
                />
                <div className="mt-5 flex items-center justify-between gap-3">
                  <div>
                    <Badge variant="secondary">{labels.status[project.status]}</Badge>
                    <h3 className="mt-3 text-2xl font-semibold">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {project.year}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="rounded-full bg-muted px-3 py-1 text-xs">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex gap-2">
                  <Link
                    href={project.links.demo}
                    className={buttonVariants({
                      size: "sm",
                      className: "rounded-xl",
                    })}
                  >
                    <ExternalLink className="size-4" />
                    {labels.demo}
                  </Link>
                  <Link
                    href={project.links.repo}
                    className={buttonVariants({
                      size: "sm",
                      variant: "outline",
                      className: "rounded-xl",
                    })}
                  >
                    <Code2 className="size-4" />
                    {labels.code}
                  </Link>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}
    </div>
  )
}
