import { cn } from "@/lib/utils"

export function PageHero({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string
  title: string
  description: string
  className?: string
}) {
  return (
    <section className={cn("mx-auto max-w-7xl px-4 pb-10 pt-16", className)}>
      <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
        {eyebrow}
      </p>
      <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-balance md:text-6xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
        {description}
      </p>
    </section>
  )
}
