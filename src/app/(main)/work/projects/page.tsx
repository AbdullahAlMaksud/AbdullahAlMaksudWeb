import type { Metadata } from "next";
import { ProjectsScreen } from "@/screens/work/ProjectsScreen";

export const metadata: Metadata = {
  title: "Projects — Abdullah Al Maksud",
  description: "All web and mobile software projects built by Abdullah Al Maksud.",
};

export default function ProjectsPage() {
  return <ProjectsScreen />;
}
