"use client"

import * as React from "react"
import { Save } from "lucide-react"
import { toast } from "sonner"

import { SpotlightCard } from "@/components/common/spotlight-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export type ContentFormField = {
  name: string
  label: string
  placeholder?: string
  type?: "text" | "number" | "url" | "date" | "textarea" | "select"
  required?: boolean
  full?: boolean
  min?: number
  max?: number
  options?: { label: string; value: string }[]
}

export function ContentForm({
  fields,
  id,
  labels,
}: {
  fields: ContentFormField[]
  id: string
  labels: {
    title: string
    description: string
    submit: string
    toast: string
  }
}) {
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    toast.success(labels.toast)
    event.currentTarget.reset()
  }

  return (
    <SpotlightCard>
      <form id={id} onSubmit={onSubmit} className="space-y-5 p-5">
        <div>
          <h2 className="text-xl font-semibold">{labels.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {labels.description}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {fields.map((field) => (
            <div
              key={field.name}
              className={cn("grid gap-2", field.full && "md:col-span-2")}
            >
              <Label htmlFor={`${id}-${field.name}`}>{field.label}</Label>
              {field.type === "textarea" ? (
                <Textarea
                  id={`${id}-${field.name}`}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="min-h-28 rounded-xl"
                />
              ) : field.type === "select" ? (
                <select
                  id={`${id}-${field.name}`}
                  name={field.name}
                  required={field.required}
                  className="h-11 rounded-xl border border-input bg-background px-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  id={`${id}-${field.name}`}
                  name={field.name}
                  type={field.type ?? "text"}
                  min={field.min}
                  max={field.max}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="h-11 rounded-xl"
                />
              )}
            </div>
          ))}
        </div>
        <Button type="submit" className="rounded-xl">
          <Save className="size-4" />
          {labels.submit}
        </Button>
      </form>
    </SpotlightCard>
  )
}
