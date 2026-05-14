import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"

import { MotionSection } from "@/components/common/motion-section"
import { SectionHeading } from "@/components/common/section-heading"
import { SpotlightCard } from "@/components/common/spotlight-card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import type { Project } from "@/types/content"

export function FeaturedProjects({
  labels,
  projects,
}: {
  labels: {
    eyebrow: string
    title: string
    description: string
    all: string
    project: string
    categories: Record<Project["category"], string>
  }
  projects: Project[]
}) {
  return (
    <MotionSection className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <SectionHeading
          eyebrow={labels.eyebrow}
          title={labels.title}
          description={labels.description}
        />
        <Link href="/projects" className={buttonVariants({ variant: "outline" })}>
          {labels.all}
          <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {projects.slice(0, 4).map((project) => (
          <SpotlightCard key={project.id}>
            <div className="grid gap-5 p-4 lg:grid-cols-[1.1fr_0.9fr]">
              <Image
                src={project.image}
                alt={`${project.title} project preview`}
                width={1200}
                height={800}
                className="aspect-[4/3] rounded-2xl object-cover"
              />
              <div className="flex flex-col justify-between gap-5">
                <div>
                  <Badge variant="secondary">{labels.categories[project.category]}</Badge>
                  <h3 className="mt-4 text-2xl font-semibold">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.stack.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <Link
                  href={project.links.demo}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  {labels.project} <ExternalLink className="size-4" />
                </Link>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </MotionSection>
  )
}
