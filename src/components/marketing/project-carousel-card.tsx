"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink, GitBranch } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import type { PortfolioProject } from "@/types/content"

export function ProjectCarouselCard({ project }: { project: PortfolioProject }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl">
      {/* Background image */}
      <Image
        src={project.coverImage}
        alt={project.title}
        fill
        sizes="100vw"
        className="object-cover object-top"
        priority
      />

      {/* Dark overlay — always present, stronger at bottom */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />

      {/* Top-left tag badge */}
      <div className="absolute left-5 top-5 z-10">
        <span className="rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
          {project.tag}
        </span>
      </div>

      {/* Top-right links */}
      <div className="absolute right-5 top-5 z-10 flex gap-2">
        {project.gitRepo && (
          <Link
            href={project.gitRepo}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon-lg" }),
              "rounded-full border border-white/20 bg-black/50 text-white/80 backdrop-blur-sm hover:bg-white/20 hover:text-white"
            )}
          >
            <GitBranch className="size-4" />
          </Link>
        )}
        {project.liveLink && (
          <Link
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon-lg" }),
              "rounded-full border border-white/20 bg-black/50 text-white/80 backdrop-blur-sm hover:bg-white/20 hover:text-white"
            )}
          >
            <ExternalLink className="size-4" />
          </Link>
        )}
      </div>

      {/* Bottom info overlay */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8">
        {/* Categories */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.categories.map((cat) => (
            <Badge
              key={cat}
              variant="secondary"
              className="rounded-full border-white/10 bg-white/10 text-white/80 backdrop-blur-sm"
            >
              {cat}
            </Badge>
          ))}
        </div>

        {/* Title + description */}
        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
          {project.title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70 md:text-base">
          {project.description}
        </p>

        {/* Stack pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-medium text-white/60 backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Core features — visible on md+ */}
        <div className="mt-5 hidden flex-wrap gap-3 md:flex">
          {project.coreFeatures.map((feat) => (
            <div
              key={feat.text}
              className="rounded-xl border border-white/10 bg-white/8 px-3 py-2 backdrop-blur-sm"
            >
              <p className="text-xs font-semibold text-white/80">{feat.text}</p>
              <p className="mt-0.5 text-xs text-white/50">{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* Dates row */}
        <div className="mt-5 flex items-center gap-4 text-xs text-white/40">
          <span>Created {project.createdAt}</span>
          <span>·</span>
          <span>Updated {project.lastUpdate}</span>
          {project.isFeatured && (
            <>
              <span>·</span>
              <span className="text-primary/80">Featured</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
