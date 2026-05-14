import type { AppTranslator } from "@/lib/i18n/server"
import type {
  BlogCategory,
  BookStatus,
  ProjectCategory,
  ProjectStatus,
} from "@/types/content"

export function getContentLabels(t: AppTranslator) {
  return {
    projectCategories: {
      all: t("projectCategory.all", { ns: "marketing" }),
      saas: t("projectCategory.saas", { ns: "marketing" }),
      writing: t("projectCategory.writing", { ns: "marketing" }),
      ai: t("projectCategory.ai", { ns: "marketing" }),
      motion: t("projectCategory.motion", { ns: "marketing" }),
    } satisfies Record<ProjectCategory, string>,
    blogCategories: {
      all: t("blogCategory.all", { ns: "marketing" }),
      engineering: t("blogCategory.engineering", { ns: "marketing" }),
      writing: t("blogCategory.writing", { ns: "marketing" }),
      design: t("blogCategory.design", { ns: "marketing" }),
    } satisfies Record<BlogCategory, string>,
    projectStatus: {
      live: t("projectStatus.live", { ns: "marketing" }),
      "case-study": t("projectStatus.case-study", { ns: "marketing" }),
      prototype: t("projectStatus.prototype", { ns: "marketing" }),
    } satisfies Record<ProjectStatus, string>,
    bookStatus: {
      drafting: t("bookStatus.drafting", { ns: "marketing" }),
      editing: t("bookStatus.editing", { ns: "marketing" }),
      published: t("bookStatus.published", { ns: "marketing" }),
    } satisfies Record<BookStatus, string>,
  }
}
