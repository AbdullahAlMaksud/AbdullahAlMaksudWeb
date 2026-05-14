import Image from "next/image"
import { BookPlus } from "lucide-react"

import {
  ContentForm,
  type ContentFormField,
} from "@/components/dashboard/content-form"
import { DataTable, type DataTableColumn } from "@/components/dashboard/data-table"
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { getContentData } from "@/lib/data"
import { getContentLabels } from "@/lib/i18n/content-labels"
import { getI18n, getRequestLocale } from "@/lib/i18n/server"
import type { Book } from "@/types/content"

export async function DashboardBooksScreen() {
  const locale = await getRequestLocale()
  const [{ books }, { t }] = await Promise.all([
    getContentData(locale),
    getI18n(locale, ["dashboard", "marketing"]),
  ])
  const labels = getContentLabels(t)
  const statusOptions = ["drafting", "editing", "published"].map((value) => ({
    value,
    label: labels.bookStatus[value as Book["status"]],
  }))
  const fields: ContentFormField[] = [
    { name: "title", label: t("forms.book.titleField", { ns: "dashboard" }), required: true },
    { name: "subtitle", label: t("forms.book.subtitle", { ns: "dashboard" }) },
    {
      name: "status",
      label: t("forms.book.status", { ns: "dashboard" }),
      type: "select",
      options: statusOptions,
    },
    {
      name: "progress",
      label: t("forms.book.progress", { ns: "dashboard" }),
      type: "number",
      min: 0,
      max: 100,
    },
    { name: "cover", label: t("forms.book.cover", { ns: "dashboard" }), type: "url" },
    { name: "tags", label: t("forms.book.tags", { ns: "dashboard" }), full: true },
    {
      name: "summary",
      label: t("forms.book.summary", { ns: "dashboard" }),
      type: "textarea",
      full: true,
    },
  ]
  const columns: DataTableColumn<Book>[] = [
    {
      key: "book",
      header: t("table.book", { ns: "dashboard" }),
      cell: (book) => (
        <div className="flex items-center gap-3">
          <Image
            src={book.cover}
            alt=""
            width={56}
            height={80}
            className="h-14 w-10 rounded-lg object-cover"
          />
          <div>
            <p className="font-medium">{book.title}</p>
            <p className="text-xs text-muted-foreground">{book.subtitle}</p>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: t("table.status", { ns: "dashboard" }),
      cell: (book) => <Badge>{labels.bookStatus[book.status]}</Badge>,
    },
    {
      key: "progress",
      header: t("table.progress", { ns: "dashboard" }),
      cell: (book) => (
        <div className="w-40">
          <Progress value={book.progress} />
          <p className="mt-1 text-xs text-muted-foreground">{book.progress}%</p>
        </div>
      ),
    },
    { key: "tags", header: t("table.tags", { ns: "dashboard" }), cell: (book) => book.tags.join(", ") },
  ]

  return (
    <>
      <DashboardPageHeader
        title={t("books.title", { ns: "dashboard" })}
        description={t("books.description", { ns: "dashboard" })}
        action={
          <a href="#new-book" className={buttonVariants({ className: "rounded-xl" })}>
            <BookPlus className="size-4" />
            {t("books.new", { ns: "dashboard" })}
          </a>
        }
      />
      <div className="space-y-5">
        <ContentForm
          id="new-book"
          fields={fields}
          labels={{
            title: t("forms.book.title", { ns: "dashboard" }),
            description: t("forms.book.description", { ns: "dashboard" }),
            submit: t("forms.book.submit", { ns: "dashboard" }),
            toast: t("forms.book.toast", { ns: "dashboard" }),
          }}
        />
        <DataTable columns={columns} data={books} />
      </div>
    </>
  )
}
