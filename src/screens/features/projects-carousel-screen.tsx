"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, GitBranch, Cpu, Globe } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { ProjectLivePreview } from "@/components/marketing/project-live-preview"
import { ProjectWebviewDialog } from "@/components/marketing/project-webview-dialog"
import type { PortfolioProject } from "@/types/content"
import { cn } from "@/lib/utils"

type ProjectsCarouselScreenLabels = {
  eyebrow: string
  title: string
  description: string
  scrollHint: string
  live: string
  code: string
}

function LiveClock() {
  const [timeStr, setTimeStr] = React.useState<string | null>(null)
  const [dateStr, setDateStr] = React.useState<string | null>(null)

  React.useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      )
      setDateStr(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      )
    }
    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!timeStr) return null

  return (
    <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center pointer-events-none select-none opacity-[0.035] dark:opacity-[0.055] transition-opacity duration-300 animate-in fade-in">
      <span className="font-mono text-5xl font-light tracking-wider leading-none select-none md:text-6xl">
        {timeStr}
      </span>
      <span className="mt-2 text-[10px] font-light uppercase tracking-widest select-none">
        {dateStr}
      </span>
    </div>
  )
}

function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <article className="group relative flex h-full min-h-[380px] flex-col justify-between p-8 bg-card/25 backdrop-blur-xs hover:bg-card/35 transition-all duration-500 overflow-hidden">
      <ProjectLivePreview
        project={project}
        className="absolute inset-0 -z-20 opacity-[0.22] group-hover:opacity-[0.42] transition-all duration-700"
        imageClassName="transition duration-700 group-hover:scale-[1.025]"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-background via-background/85 to-background/25" />
      <LiveClock />

      {/* Top Header */}
      <div className="flex items-start justify-between">
        {/* Logo container */}
        <div className="relative flex size-10 items-center justify-center rounded-xl border border-border bg-background p-1.5 shadow-sm backdrop-blur-sm group-hover:scale-105 transition-transform duration-300">
          {project.logo ? (
            <div className="relative size-full">
              <Image
                src={project.logo}
                alt={project.title}
                fill
                sizes="28px"
                className="object-contain object-center"
              />
            </div>
          ) : (
            <span className="text-sm font-semibold uppercase">{project.title[0]}</span>
          )}
        </div>

        {/* Categories Badges */}
        <div className="flex flex-wrap gap-1 justify-end max-w-[60%]">
          {project.categories.slice(0, 2).map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="text-[10px] font-medium border-border bg-background/40 px-2 py-0 hover:bg-background/40 backdrop-blur-xs"
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Middle info */}
      <div className="mt-8 flex-1 flex flex-col justify-end">
        <span className="text-[10px] font-medium tracking-widest text-primary uppercase">
          {project.tag}
        </span>
        <h3 className="mt-1 text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="mt-3 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Technology Stack */}
        <div className="mt-6">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/80 font-medium">
            <Cpu className="size-3.5" />
            <span>Technology</span>
          </div>
          <p className="mt-1 text-xs text-foreground/85 font-semibold tracking-wide">
            {project.stack.slice(0, 4).join(", ")}
          </p>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="mt-8 pt-4 border-t border-border/30 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Link
            href={project.gitRepo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "rounded-lg border-border/60 bg-background/30 hover:bg-muted text-xs h-8 px-2.5 backdrop-blur-sm"
            )}
          >
            <GitBranch className="size-3.5" />
            <span>Github</span>
          </Link>

          <Link
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "rounded-lg border-border/60 bg-background/30 hover:bg-muted text-xs h-8 px-2.5 backdrop-blur-sm"
            )}
          >
            <Globe className="size-3.5" />
            <span>Livelink</span>
          </Link>
        </div>

        <div className="flex items-center gap-1">
          <ProjectWebviewDialog
            project={project}
            triggerLabel="Demo"
            triggerClassName="rounded-lg bg-foreground text-background hover:bg-foreground/90 text-xs h-8 px-3 font-medium cursor-pointer"
          />
          <Link
            href={`/projects/${project.id}`}
            onClick={(e) => e.stopPropagation()}
            className="flex size-8 items-center justify-center rounded-lg border border-border/60 bg-background/30 hover:bg-muted transition-colors backdrop-blur-sm cursor-pointer"
            title="Details"
          >
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}

function BuzzwordCard({ text }: { text: string }) {
  return (
    <div className="group relative flex items-center justify-center p-8 min-h-[380px] h-full overflow-hidden select-none bg-card/5 transition-colors duration-500 hover:bg-card/10">
      <span className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground/15 group-hover:text-primary/35 group-hover:scale-105 transition-all duration-500 text-center font-heading">
        {text}
      </span>
    </div>
  )
}

export function ProjectsCarouselScreen({
  projects = [],
  labels,
}: {
  projects?: PortfolioProject[]
  labels: ProjectsCarouselScreenLabels
}) {
  const buzzwords = [
    "Frontend",
    "Problem Solving",
    "Clean Code",
    "UI/UX Design",
    "Full Stack",
  ]

  // Mix projects and buzzwords dynamically to construct a beautiful grid
  const gridItems: ({ type: "project"; project: PortfolioProject } | { type: "buzzword"; text: string })[] = []
  let projectIdx = 0
  let buzzwordIdx = 0

  while (projectIdx < projects.length || buzzwordIdx < buzzwords.length) {
    if (projectIdx < projects.length) {
      gridItems.push({ type: "project", project: projects[projectIdx++] })
    }
    if (projectIdx < projects.length) {
      gridItems.push({ type: "project", project: projects[projectIdx++] })
    }
    if (buzzwordIdx < buzzwords.length) {
      gridItems.push({ type: "buzzword", text: buzzwords[buzzwordIdx++] })
    }
  }

  return (
    <div className="h-svh w-full overflow-y-auto custom-scrollbar">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-20">
        {/* Intro Section */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <Badge variant="secondary" className="mb-4 rounded-full px-3 py-1 text-xs">
            {labels.eyebrow}
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl text-balance">
            {labels.title}
          </h1>
          <p className="mt-6 text-base leading-7 text-muted-foreground md:text-lg">
            {labels.description}
          </p>
        </div>

        {/* The Grid of Projects and Buzzwords */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border/40 rounded-2xl overflow-hidden bg-card/5 backdrop-blur-xs">
          {gridItems.map((item, idx) => (
            <div key={idx} className="border-r border-b border-border/40">
              {item.type === "project" ? (
                <ProjectCard project={item.project} />
              ) : (
                <BuzzwordCard text={item.text} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
