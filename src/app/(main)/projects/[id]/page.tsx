import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft, ExternalLink, GitBranch } from "lucide-react"

import { ProjectLivePreview } from "@/components/marketing/project-live-preview"
import { ProjectWebviewDialog } from "@/components/marketing/project-webview-dialog"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { getI18n, getRequestLocale } from "@/lib/i18n/server"
import { cn } from "@/lib/utils"
import { fetchApi } from "@/lib/api"
import type { PortfolioProject } from "@/types/content"

export const dynamic = "force-dynamic"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  let project: PortfolioProject | null = null
  try {
    project = await fetchApi<PortfolioProject>(`/api/v1/projects/${id}`)
  } catch (err) {}

  return {
    title: project?.title ?? "Project",
    description: project?.description,
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  let project: PortfolioProject | null = null
  try {
    project = await fetchApi<PortfolioProject>(`/api/v1/projects/${id}`)
  } catch (error) {
    console.error("Failed to fetch project:", error)
  }

  if (!project || project.isArchived) {
    notFound()
  }

  const locale = await getRequestLocale()
  const { t } = await getI18n(locale, "marketing")

  return (
    <main className="min-h-svh">
      <section className="relative min-h-svh overflow-hidden">
        <ProjectLivePreview project={project} className="absolute inset-0" />
        <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/45 to-black/15" />

        <div className="relative z-10 flex min-h-svh flex-col justify-end px-5 py-8 text-white md:px-12">
          <Link
            href="/projects"
            className="mb-auto inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-2 text-sm text-white/75 backdrop-blur transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="size-4" />
            {t("pages.projects.title")}
          </Link>

          <div className="max-w-5xl">
            <div className="mb-4 flex flex-wrap gap-2">
              {project.categories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="border-white/10 bg-white/10 text-white/75 backdrop-blur"
                >
                  {category}
                </Badge>
              ))}
            </div>
            <p className="text-xs font-medium tracking-widest text-white/55 uppercase">
              {project.tag}
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/72 md:text-lg">
              {project.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ProjectWebviewDialog
                project={project}
                triggerLabel={t("browser.demo")}
                triggerClassName="rounded-full bg-white text-black hover:bg-white/85"
              />
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "rounded-full border-white/20 bg-black/35 text-white backdrop-blur hover:bg-white/15"
                )}
              >
                Open site
                <ExternalLink className="size-4" />
              </a>
              <a
                href={project.gitRepo}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "rounded-full border-white/20 bg-black/35 text-white backdrop-blur hover:bg-white/15"
                )}
              >
                {t("browser.code")}
                <GitBranch className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-[0.85fr_1.15fr] md:px-8">
        <div>
          <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
            Project details
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Minimal system notes
          </h2>
          <div className="mt-6 grid gap-4 text-sm text-muted-foreground">
            <p>Created {project.createdAt}</p>
            <p>Updated {project.lastUpdate}</p>
            <p>
              {project.isFeatured ? "Featured project" : "Portfolio project"}
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {project.coreFeatures.map((feature) => (
            <article
              key={feature.text}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <h3 className="text-base font-semibold">{feature.text}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {feature.desc}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
