"use client"

import { BookPlus, FolderPlus, PenSquare, Sparkles } from "lucide-react"
import { toast } from "sonner"

import { SpotlightCard } from "@/components/common/spotlight-card"
import { Button } from "@/components/ui/button"

const actions = [
  { label: "New Project", icon: FolderPlus },
  { label: "Write Blog", icon: PenSquare },
  { label: "Add Book", icon: BookPlus },
  { label: "New Idea", icon: Sparkles },
]

export function QuickActions() {
  return (
    <SpotlightCard>
      <div className="p-5">
        <h3 className="font-semibold">Quick Actions</h3>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className="h-24 flex-col rounded-2xl"
              onClick={() => toast.info(`${action.label} is a frontend mock action.`)}
            >
              <action.icon className="size-5 text-primary" />
              <span>{action.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </SpotlightCard>
  )
}
