import type { Metadata } from "next"

import { defaultLocale } from "@/lib/i18n/resources"
import { getI18n, getRequestLocale } from "@/lib/i18n/server"
import { ProjectsCarouselScreen } from "@/screens/features/projects-carousel-screen"
import { fetchApi } from "@/lib/api"
import type { PortfolioProject } from "@/types/content"

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n(await getRequestLocale(), "marketing")
  return {
    title: t("pages.projects.title"),
  }
}

export default async function Page() {
  const locale = await getRequestLocale()
  const { t } = await getI18n(locale, "marketing")

  let projects: PortfolioProject[] = []
  try {
    projects = await fetchApi<PortfolioProject[]>("/api/v1/projects")
  } catch (error) {
    console.error("Failed to fetch projects:", error)
  }

  const activeProjects = projects.filter((p) => !p.isArchived)

  return (
    <ProjectsCarouselScreen
      projects={activeProjects}
      labels={{
        eyebrow: t("pages.projects.eyebrow"),
        title: t("pages.projects.hero"),
        description: t("pages.projects.description"),
        scrollHint:
          locale === defaultLocale
            ? "Scroll for projects"
            : "প্রজেক্ট দেখতে স্ক্রোল করুন",
        live: t("browser.demo"),
        code: t("browser.code"),
      }}
    />
  )
}

