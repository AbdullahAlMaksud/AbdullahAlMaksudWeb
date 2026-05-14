import type { Metadata } from "next"

import { getI18n, getRequestLocale } from "@/lib/i18n/server"
import { BooksScreen } from "@/screens/features/books-screen"

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n(await getRequestLocale(), "marketing")
  return {
    title: t("pages.books.title"),
  }
}

export default function Page() {
  return <BooksScreen />
}
