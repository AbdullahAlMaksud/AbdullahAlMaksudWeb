import type { Metadata } from "next"

import { BooksScreen } from "@/screens/features/books-screen"

export const metadata: Metadata = {
  title: "Books",
}

export default function Page() {
  return <BooksScreen />
}
