import type { Metadata } from "next"

import { ProjectsScreen } from "@/screens/features/projects-screen"

export const metadata: Metadata = {
  title: "Projects",
}

export default function Page() {
  return <ProjectsScreen />
}
