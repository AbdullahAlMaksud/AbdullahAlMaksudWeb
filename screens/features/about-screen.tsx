import Link from "next/link"
import { Code2, Download, Mail, Network } from "lucide-react"

import { SectionHeading } from "@/components/common/section-heading"
import { SpotlightCard } from "@/components/common/spotlight-card"
import { PageHero } from "@/components/marketing/page-hero"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getSiteData } from "@/lib/data"
import { getI18n, getRequestLocale } from "@/lib/i18n/server"

export async function AboutScreen() {
  const locale = await getRequestLocale()
  const [{ experience, siteConfig, skillGroups }, { t }] = await Promise.all([
    getSiteData(locale),
    getI18n(locale, "marketing"),
  ])

  return (
    <>
      <PageHero
        eyebrow={t("pages.about.eyebrow")}
        title={t("pages.about.hero")}
        description={t("pages.about.description")}
      />
      <main className="mx-auto grid max-w-7xl gap-6 px-4 pb-20 lg:grid-cols-[0.9fr_1.1fr]">
        <SpotlightCard>
          <div className="p-6">
            <SectionHeading
              title={t("about.bioTitle")}
              description={t("about.bio")}
            />
            <Separator className="my-6" />
            <div className="flex flex-wrap gap-3">
              <Link
                href="https://github.com"
                className={buttonVariants({ variant: "outline", className: "rounded-xl" })}
              >
                <Code2 className="size-4" />
                GitHub
              </Link>
              <Link
                href="https://linkedin.com"
                className={buttonVariants({ variant: "outline", className: "rounded-xl" })}
              >
                <Network className="size-4" />
                LinkedIn
              </Link>
              <Link
                href={`mailto:${siteConfig.email}`}
                className={buttonVariants({ className: "rounded-xl" })}
              >
                <Mail className="size-4" />
                {t("about.email")}
              </Link>
            </div>
          </div>
        </SpotlightCard>
        <div className="grid gap-6">
          <SpotlightCard>
            <div className="p-6">
              <h2 className="text-2xl font-semibold">{t("about.skills")}</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {skillGroups.map((group) => (
                  <div key={group.title} className="rounded-2xl bg-muted/50 p-4">
                    <h3 className="font-semibold">{group.title}</h3>
                    <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                      {group.items.map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SpotlightCard>
          <SpotlightCard>
            <div className="p-6">
              <h2 className="text-2xl font-semibold">{t("about.timeline")}</h2>
              <div className="mt-6 space-y-5">
                {experience.map((item) => (
                  <div key={item.year} className="rounded-2xl bg-muted/40 p-4">
                    <p className="text-sm font-semibold text-primary">{item.year}</p>
                    <p className="mt-1 font-semibold">{item.role}</p>
                    <p className="text-sm text-muted-foreground">{item.company}</p>
                  </div>
                ))}
              </div>
            </div>
          </SpotlightCard>
          <SpotlightCard>
            <div id="contact" className="p-6">
              <h2 className="text-2xl font-semibold">{t("about.resume")}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {t("about.resumeDescription")}
              </p>
              <Button className="mt-5 rounded-xl">
                <Download className="size-4" />
                {t("about.downloadResume")}
              </Button>
            </div>
          </SpotlightCard>
        </div>
      </main>
    </>
  )
}
