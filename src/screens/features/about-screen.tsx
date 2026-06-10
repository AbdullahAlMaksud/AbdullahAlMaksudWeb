import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { FullpageScroll } from "@/components/common/fullpage-scroll"
import { buttonVariants } from "@/components/ui/button"
import { getSiteData } from "@/lib/data"
import { getI18n, getRequestLocale } from "@/lib/i18n/server"

type CenterTimelineItem = {
  description: string
  marker: string
  subtitle: string
  title: string
}

function CenterTimelineSection({
  items,
  label,
}: {
  items: CenterTimelineItem[]
  label: string
}) {
  return (
    <section className="flex h-full items-center justify-center overflow-y-auto px-8 py-12 text-center md:px-16">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
        <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
          {label}
        </p>
        <div className="relative mt-10 flex w-full flex-col items-center gap-8">
          <div className="absolute top-6 bottom-6 left-1/2 w-px -translate-x-1/2 bg-border" />
          {items.map((item) => (
            <article
              key={`${item.marker}-${item.title}`}
              className="relative z-10 flex w-full max-w-xl flex-col items-center rounded-2xl border border-border bg-background/90 px-6 py-5 shadow-sm backdrop-blur"
            >
              <span className="absolute -top-3 left-1/2 size-6 -translate-x-1/2 rounded-full border border-border bg-background p-1">
                <span className="block size-full rounded-full bg-primary" />
              </span>
              <span className="mt-2 text-sm text-muted-foreground tabular-nums">
                {item.marker}
              </span>
              <h2 className="mt-3 text-xl leading-tight font-semibold">
                {item.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.subtitle}
              </p>
              <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground/75">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export async function AboutScreen() {
  const locale = await getRequestLocale()
  const [{ experience, education, siteConfig }, { t }] = await Promise.all([
    getSiteData(locale),
    getI18n(locale, "marketing"),
  ])

  return (
    <FullpageScroll>
      {/* Section 1 — Experience */}
      <CenterTimelineSection
        label={t("about.experienceLabel")}
        items={experience.map((item) => ({
          description: item.description,
          marker: item.year,
          subtitle: item.company,
          title: item.role,
        }))}
      />

      {/* Section 2 — Education */}
      <CenterTimelineSection
        label={t("about.educationLabel")}
        items={education.map((item) => ({
          description: item.description,
          marker: item.year,
          subtitle: item.institution,
          title: item.degree,
        }))}
      />

      {/* Section 3 — Contact */}
      <section className="flex h-full items-center justify-center overflow-y-auto px-8 py-12 text-center md:px-16">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
          <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
            {t("about.contact.title")}
          </p>
          <h2 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
            {siteConfig.owner}
          </h2>
          <span className="mt-8 h-16 w-px bg-border" />
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-sm text-muted-foreground">
                {t("about.email")}
              </span>
              <Link
                href={`mailto:${siteConfig.email}`}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {siteConfig.email}
              </Link>
            </div>
            <span className="h-10 w-px bg-border/70" />
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-sm text-muted-foreground">Facebook</span>
              <Link
                href="https://facebook.com/abdullahmaksud"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                facebook.com/abdullahmaksud
              </Link>
            </div>
          </div>
          <Link
            href="https://facebook.com/abdullahmaksud"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              size: "lg",
              className: "mt-10 rounded-xl px-8",
            })}
          >
            {t("about.contact.connect")}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </FullpageScroll>
  )
}
