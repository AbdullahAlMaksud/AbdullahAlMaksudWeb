import type { Metadata } from "next"

import { BlogScreen } from "@/screens/features/blog-screen"

export const metadata: Metadata = {
  title: "Blog",
}

export default function Page() {
  return <BlogScreen />
}
