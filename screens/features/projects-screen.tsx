import { PageHero } from "@/components/marketing/page-hero"
import { ProjectBrowser } from "@/components/marketing/project-browser"

export function ProjectsScreen() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Interfaces, dashboards, and writing tools with a premium finish."
        description="Explore selected product surfaces with category filters, search, motion, and reusable project cards."
      />
      <main className="mx-auto max-w-7xl px-4 pb-20">
        <ProjectBrowser />
      </main>
    </>
  )
}
