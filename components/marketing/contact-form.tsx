"use client"

import { type FormEvent, useId } from "react"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type ContactFormLabels = {
  title: string
  description: string
  name: string
  namePlaceholder: string
  email: string
  emailPlaceholder: string
  subject: string
  subjectPlaceholder: string
  message: string
  messagePlaceholder: string
  submit: string
}

export function ContactForm({
  email,
  labels,
}: {
  email: string
  labels: ContactFormLabels
}) {
  const formId = useId()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") ?? "").trim()
    const senderEmail = String(formData.get("email") ?? "").trim()
    const subject = String(formData.get("subject") ?? "").trim()
    const message = String(formData.get("message") ?? "").trim()

    const body = [
      name && `${labels.name}: ${name}`,
      senderEmail && `${labels.email}: ${senderEmail}`,
      message,
    ]
      .filter(Boolean)
      .join("\n\n")

    const params = new URLSearchParams({
      subject,
      body,
    })

    window.location.href = `mailto:${email}?${params.toString()}`
  }

  return (
    <div id="contact">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">{labels.title}</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {labels.description}
        </p>
      </div>
      <form
        action={`mailto:${email}`}
        method="post"
        encType="text/plain"
        className="grid gap-4"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-2">
          <Label htmlFor={`${formId}-name`}>{labels.name}</Label>
          <Input
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            placeholder={labels.namePlaceholder}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`${formId}-email`}>{labels.email}</Label>
          <Input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder={labels.emailPlaceholder}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`${formId}-subject`}>{labels.subject}</Label>
          <Input
            id={`${formId}-subject`}
            name="subject"
            placeholder={labels.subjectPlaceholder}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`${formId}-message`}>{labels.message}</Label>
          <Textarea
            id={`${formId}-message`}
            name="message"
            className="min-h-28 resize-none"
            placeholder={labels.messagePlaceholder}
            required
          />
        </div>
        <Button type="submit" className="mt-1 w-full rounded-xl md:w-fit">
          <Send className="size-4" />
          {labels.submit}
        </Button>
      </form>
    </div>
  )
}
