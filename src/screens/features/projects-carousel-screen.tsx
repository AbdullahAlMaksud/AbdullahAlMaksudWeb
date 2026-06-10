"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowDown, ArrowRight, GitBranch } from "lucide-react"

import {
  FullpageScroll,
  useFullpageNext,
} from "@/components/common/fullpage-scroll"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { ProjectLivePreview } from "@/components/marketing/project-live-preview"
import { ProjectWebviewDialog } from "@/components/marketing/project-webview-dialog"
import { portfolioProjects } from "@/constants/data/projects"
import { cn } from "@/lib/utils"
import type { PortfolioProject } from "@/types/content"

type ProjectsCarouselScreenLabels = {
  eyebrow: string
  title: string
  description: string
  scrollHint: string
  live: string
  code: string
}

export function ProjectsCarouselScreen({
  labels,
}: {
  labels: ProjectsCarouselScreenLabels
}) {
  return (
    <FullpageScroll>
      <ProjectsIntro labels={labels} />
      {portfolioProjects.map((project, index) => (
        <ProjectSection
          key={project.id}
          index={index}
          labels={labels}
          project={project}
        />
      ))}
    </FullpageScroll>
  )
}

function ProjectsIntro({ labels }: { labels: ProjectsCarouselScreenLabels }) {
  const goNext = useFullpageNext()

  return (
    <section className="relative flex h-full items-center justify-center overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <Badge variant="secondary" className="mb-5 rounded-full px-3 py-1">
          {labels.eyebrow}
        </Badge>
        <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-balance md:text-7xl">
          {labels.title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
          {labels.description}
        </p>
        <button
          onClick={goNext}
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-sm text-muted-foreground backdrop-blur transition hover:bg-muted hover:text-foreground"
        >
          {labels.scrollHint}
          <ArrowDown className="size-4" />
        </button>
      </div>
    </section>
  )
}

function ProjectSection({
  index,
  labels,
  project,
}: {
  index: number
  labels: ProjectsCarouselScreenLabels
  project: PortfolioProject
}) {
  const router = useRouter()
  const detailsHref = `/projects/${project.id}`

  const openDetails = () => {
    router.push(detailsHref)
  }

  const openDetailsFromKeyboard = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      openDetails()
    }
  }

  return (
    <section className="flex h-full items-center justify-center overflow-hidden px-8 py-12 sm:px-12 md:px-20 lg:px-32">
      <article
        role="link"
        tabIndex={0}
        aria-label={`View ${project.title} details`}
        onClick={openDetails}
        onKeyDown={openDetailsFromKeyboard}
        className="group relative h-[68svh] w-full max-w-6xl cursor-pointer overflow-hidden rounded-2xl bg-muted shadow-2xl shadow-black/20 ring-offset-background transition outline-none focus-visible:ring-3 focus-visible:ring-ring/60 md:h-[72svh]"
      >
        <ProjectLivePreview
          project={project}
          className="absolute inset-0"
          imageClassName="transition duration-700 group-hover:scale-[1.025]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-black/5" />
        <div className="absolute top-5 left-5 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-widest text-white/55 uppercase">
              {project.tag}
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
              {project.title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70 md:text-base">
              {project.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {project.categories.slice(0, 3).map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="border-white/10 bg-white/10 text-white/75 backdrop-blur"
                >
                  {category}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={project.gitRepo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "rounded-full border-white/20 bg-black/35 text-white backdrop-blur hover:bg-white/15"
                )}
              >
                <GitBranch className="size-3.5" />
                {labels.code}
              </Link>
              <ProjectWebviewDialog
                project={project}
                triggerClassName="rounded-full bg-white text-black hover:bg-white/85"
              />
              <span className="hidden items-center gap-1 text-xs font-medium text-white/55 md:inline-flex">
                Details
                <ArrowRight className="size-3.5" />
              </span>
            </div>
          </div>
        </div>
      </article>
    </section>
  )
}
