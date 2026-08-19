"use client";

import { AppProjectCard, ProjectItem } from "@/components/cards/AppProjectCard";

export function ProjectCard(props: ProjectItem & { index?: string }) {
  return <AppProjectCard {...props} />;
}
