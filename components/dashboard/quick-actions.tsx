"use client"

import { BookPlus, FolderPlus, PenSquare, Sparkles } from "lucide-react"
import { toast } from "sonner"

import { SpotlightCard } from "@/components/common/spotlight-card"
import { Button } from "@/components/ui/button"

const actions = [
  { key: "newProject", icon: FolderPlus },
  { key: "writeBlog", icon: PenSquare },
  { key: "addBook", icon: BookPlus },
  { key: "newIdea", icon: Sparkles },
] as const

export function QuickActions({
  labels,
}: {
  labels: {
    title: string
    actions: Record<(typeof actions)[number]["key"], string>
    toasts: Record<(typeof actions)[number]["key"], string>
  }
}) {
  return (
    <SpotlightCard>
      <div className="p-5">
        <h3 className="font-semibold">{labels.title}</h3>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((action) => (
            <Button
              key={action.key}
              variant="outline"
              className="h-24 flex-col rounded-2xl"
              onClick={() => toast.info(labels.toasts[action.key])}
            >
              <action.icon className="size-5 text-primary" />
              <span>{labels.actions[action.key]}</span>
            </Button>
          ))}
        </div>
      </div>
    </SpotlightCard>
  )
}
