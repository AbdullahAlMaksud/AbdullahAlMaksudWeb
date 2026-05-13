import type { Metadata } from "next"

import { AboutScreen } from "@/screens/features/about-screen"

export const metadata: Metadata = {
  title: "About",
}

export default function Page() {
  return <AboutScreen />
}
