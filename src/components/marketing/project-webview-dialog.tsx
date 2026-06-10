"use client"

import { ExternalLink, Globe } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { PortfolioProject } from "@/types/content"

export function ProjectWebviewDialog({
  project,
  triggerLabel = "Browse",
  triggerClassName,
}: {
  project: PortfolioProject
  triggerLabel?: string
  triggerClassName?: string
}) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            type="button"
            className={triggerClassName}
            onClick={(event) => event.stopPropagation()}
          />
        }
      >
        {triggerLabel}
        <Globe className="size-3.5" />
      </DialogTrigger>
      <DialogContent
        className="grid h-[88svh] max-w-[calc(100%-1rem)] grid-rows-[auto_1fr] gap-0 overflow-hidden rounded-2xl p-0 sm:max-w-6xl"
        onClick={(event) => event.stopPropagation()}
      >
        <DialogHeader className="border-b border-border px-4 py-3 pr-12">
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle>{project.title}</DialogTitle>
              <DialogDescription>{project.liveLink}</DialogDescription>
            </div>
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "rounded-full"
              )}
            >
              Open site
              <ExternalLink className="size-3.5" />
            </a>
          </div>
        </DialogHeader>
        <div className="relative min-h-0 flex-1 bg-muted">
          <iframe
            src={project.liveLink}
            title={`${project.title} live preview`}
            className="h-full w-full border-0 bg-background"
            referrerPolicy="no-referrer"
            sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          />
          <p className="pointer-events-none absolute inset-x-4 bottom-3 rounded-full border border-border bg-background/85 px-3 py-2 text-center text-xs text-muted-foreground shadow-sm backdrop-blur">
            If the site blocks embedded browsing, use Open site.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
