import { PageHero } from "@/components/marketing/page-hero"
import { ProjectBrowser } from "@/components/marketing/project-browser"
import { getContentData } from "@/lib/data"
import { getContentLabels } from "@/lib/i18n/content-labels"
import { getI18n, getRequestLocale } from "@/lib/i18n/server"

export async function ProjectsScreen() {
  const locale = await getRequestLocale()
  const [{ projects }, { t }] = await Promise.all([
    getContentData(locale),
    getI18n(locale, "marketing"),
  ])
  const contentLabels = getContentLabels(t)

  return (
    <>
      <PageHero
        eyebrow={t("pages.projects.eyebrow")}
        title={t("pages.projects.hero")}
        description={t("pages.projects.description")}
      />
      <main className="mx-auto max-w-7xl px-4 pb-20">
        <ProjectBrowser
          labels={{
            categories: contentLabels.projectCategories,
            status: contentLabels.projectStatus,
            search: t("browser.searchProjects"),
            emptyTitle: t("browser.noProjects"),
            emptyDescription: t("browser.noProjectsDescription"),
            demo: t("browser.demo"),
            code: t("browser.code"),
          }}
          projects={projects}
        />
      </main>
    </>
  )
}
