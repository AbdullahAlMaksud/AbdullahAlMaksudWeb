import { BookBrowser } from "@/components/marketing/book-browser"
import { PageHero } from "@/components/marketing/page-hero"
import { getContentData } from "@/lib/data"
import { getContentLabels } from "@/lib/i18n/content-labels"
import { getI18n, getRequestLocale } from "@/lib/i18n/server"

export async function BooksScreen() {
  const locale = await getRequestLocale()
  const [{ books }, { t }] = await Promise.all([
    getContentData(locale),
    getI18n(locale, "marketing"),
  ])
  const contentLabels = getContentLabels(t)

  return (
    <>
      <PageHero
        eyebrow={t("pages.books.eyebrow")}
        title={t("pages.books.hero")}
        description={t("pages.books.description")}
      />
      <main className="mx-auto max-w-7xl px-4 pb-20">
        <BookBrowser
          books={books}
          labels={{
            search: t("browser.searchBooks"),
            emptyTitle: t("browser.noBooks"),
            emptyDescription: t("browser.noBooksDescription"),
            details: t("browser.details"),
            completeTemplate: t("home.books.complete", { value: "{value}" }),
            status: contentLabels.bookStatus,
          }}
        />
      </main>
    </>
  )
}
