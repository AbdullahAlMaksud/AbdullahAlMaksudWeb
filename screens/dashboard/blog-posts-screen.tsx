import Image from "next/image"
import { PenSquare } from "lucide-react"

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
import type { BlogPost } from "@/types/content"

export async function DashboardBlogPostsScreen() {
  const locale = await getRequestLocale()
  const [{ blogPosts }, { t }] = await Promise.all([
    getContentData(locale),
    getI18n(locale, ["dashboard", "marketing"]),
  ])
  const labels = getContentLabels(t)
  const categoryOptions = ["engineering", "writing", "design"].map((value) => ({
    value,
    label: labels.blogCategories[value as BlogPost["category"]],
  }))
  const fields: ContentFormField[] = [
    { name: "title", label: t("forms.blog.titleField", { ns: "dashboard" }), required: true },
    { name: "slug", label: t("forms.blog.slug", { ns: "dashboard" }), required: true },
    {
      name: "category",
      label: t("forms.blog.category", { ns: "dashboard" }),
      type: "select",
      options: categoryOptions,
    },
    { name: "date", label: t("forms.blog.date", { ns: "dashboard" }) },
    { name: "readTime", label: t("forms.blog.readTime", { ns: "dashboard" }) },
    { name: "image", label: t("forms.blog.image", { ns: "dashboard" }), type: "url" },
    { name: "tags", label: t("forms.blog.tags", { ns: "dashboard" }), full: true },
    {
      name: "excerpt",
      label: t("forms.blog.excerpt", { ns: "dashboard" }),
      type: "textarea",
      full: true,
    },
    {
      name: "content",
      label: t("forms.blog.content", { ns: "dashboard" }),
      type: "textarea",
      full: true,
    },
  ]
  const columns: DataTableColumn<BlogPost>[] = [
    {
      key: "post",
      header: t("table.post", { ns: "dashboard" }),
      cell: (post) => (
        <div className="flex items-center gap-3">
          <Image
            src={post.image}
            alt=""
            width={80}
            height={54}
            className="h-12 w-16 rounded-xl object-cover"
          />
          <div>
            <p className="font-medium">{post.title}</p>
            <p className="text-xs text-muted-foreground">{post.readTime}</p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: t("table.category", { ns: "dashboard" }),
      cell: (post) => <Badge>{labels.blogCategories[post.category]}</Badge>,
    },
    { key: "date", header: t("table.date", { ns: "dashboard" }), cell: (post) => post.date },
    { key: "tags", header: t("table.tags", { ns: "dashboard" }), cell: (post) => post.tags.join(", ") },
  ]

  return (
    <>
      <DashboardPageHeader
        title={t("blog.title", { ns: "dashboard" })}
        description={t("blog.description", { ns: "dashboard" })}
        action={
          <a href="#new-blog-post" className={buttonVariants({ className: "rounded-xl" })}>
            <PenSquare className="size-4" />
            {t("blog.new", { ns: "dashboard" })}
          </a>
        }
      />
      <div className="space-y-5">
        <ContentForm
          id="new-blog-post"
          fields={fields}
          labels={{
            title: t("forms.blog.title", { ns: "dashboard" }),
            description: t("forms.blog.description", { ns: "dashboard" }),
            submit: t("forms.blog.submit", { ns: "dashboard" }),
            toast: t("forms.blog.toast", { ns: "dashboard" }),
          }}
        />
        <DataTable columns={columns} data={blogPosts} />
      </div>
    </>
  )
}
