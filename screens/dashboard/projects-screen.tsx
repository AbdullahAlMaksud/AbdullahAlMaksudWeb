import Image from "next/image"
import { Plus } from "lucide-react"

import {
  ContentForm,
  type ContentFormField,
} from "@/components/dashboard/content-form"
import { DataTable, type DataTableColumn } from "@/components/dashboard/data-table"
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { getContentData } from "@/lib/data"
import { getContentLabels } from "@/lib/i18n/content-labels"
import { getI18n, getRequestLocale } from "@/lib/i18n/server"
import type { Project } from "@/types/content"

export async function DashboardProjectsScreen() {
  const locale = await getRequestLocale()
  const [{ projects }, { t }] = await Promise.all([
    getContentData(locale),
    getI18n(locale, ["dashboard", "marketing"]),
  ])
  const labels = getContentLabels(t)
  const categoryOptions = ["saas", "writing", "ai", "motion"].map((value) => ({
    value,
    label: labels.projectCategories[value as Project["category"]],
  }))
  const statusOptions = ["live", "case-study", "prototype"].map((value) => ({
    value,
    label: labels.projectStatus[value as Project["status"]],
  }))
  const fields: ContentFormField[] = [
    { name: "title", label: t("forms.project.titleField", { ns: "dashboard" }), required: true },
    { name: "slug", label: t("forms.project.slug", { ns: "dashboard" }), required: true },
    {
      name: "category",
      label: t("forms.project.category", { ns: "dashboard" }),
      type: "select",
      options: categoryOptions,
    },
    {
      name: "status",
      label: t("forms.project.status", { ns: "dashboard" }),
      type: "select",
      options: statusOptions,
    },
    { name: "year", label: t("forms.project.year", { ns: "dashboard" }) },
    { name: "image", label: t("forms.project.image", { ns: "dashboard" }), type: "url" },
    { name: "stack", label: t("forms.project.stack", { ns: "dashboard" }), full: true },
    {
      name: "description",
      label: t("forms.project.descriptionField", { ns: "dashboard" }),
      type: "textarea",
      full: true,
    },
    { name: "demo", label: t("forms.project.demo", { ns: "dashboard" }), type: "url" },
    { name: "repo", label: t("forms.project.repo", { ns: "dashboard" }), type: "url" },
  ]
  const columns: DataTableColumn<Project>[] = [
    {
      key: "project",
      header: t("table.project", { ns: "dashboard" }),
      cell: (project) => (
        <div className="flex items-center gap-3">
          <Image
            src={project.image}
            alt=""
            width={80}
            height={54}
            className="h-12 w-16 rounded-xl object-cover"
          />
          <div>
            <p className="font-medium">{project.title}</p>
            <p className="text-xs text-muted-foreground">
              {labels.projectCategories[project.category]}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: t("table.status", { ns: "dashboard" }),
      cell: (project) => <Badge>{labels.projectStatus[project.status]}</Badge>,
    },
    { key: "year", header: t("table.year", { ns: "dashboard" }), cell: (project) => project.year },
    {
      key: "stack",
      header: t("table.stack", { ns: "dashboard" }),
      cell: (project) => project.stack.slice(0, 3).join(", "),
    },
  ]

  return (
    <>
      <DashboardPageHeader
        title={t("projects.title", { ns: "dashboard" })}
        description={t("projects.description", { ns: "dashboard" })}
        action={
          <a href="#new-project" className={buttonVariants({ className: "rounded-xl" })}>
            <Plus className="size-4" />
            {t("projects.new", { ns: "dashboard" })}
          </a>
        }
      />
      <div className="space-y-5">
        <ContentForm
          id="new-project"
          fields={fields}
          labels={{
            title: t("forms.project.title", { ns: "dashboard" }),
            description: t("forms.project.description", { ns: "dashboard" }),
            submit: t("forms.project.submit", { ns: "dashboard" }),
            toast: t("forms.project.toast", { ns: "dashboard" }),
          }}
        />
        <DataTable columns={columns} data={projects} />
      </div>
    </>
  )
}
