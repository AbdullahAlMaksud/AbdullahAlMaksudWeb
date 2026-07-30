import { fetchApi } from "@/lib/api"
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { getI18n, getRequestLocale } from "@/lib/i18n/server"
import { ProjectsManager } from "@/components/dashboard/projects-manager"
import type { PortfolioProject } from "@/types/content"

export async function DashboardProjectsScreen() {
  const locale = await getRequestLocale()
  const { t } = await getI18n(locale, ["dashboard", "marketing"])

  let projects: PortfolioProject[] = []
  try {
    // Fetch all projects from MongoDB via the Hono API server
    projects = await fetchApi<PortfolioProject[]>("/api/v1/projects")
  } catch (error) {
    console.error("Failed to fetch dashboard projects:", error)
  }

  return (
    <>
      <DashboardPageHeader
        title={t("projects.title", { ns: "dashboard" })}
        description={t("projects.description", { ns: "dashboard" })}
      />
      <div className="mt-6">
        <ProjectsManager initialProjects={projects} />
      </div>
    </>
  )
}

