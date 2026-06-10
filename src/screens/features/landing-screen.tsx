import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { FullpageScroll } from "@/components/common/fullpage-scroll"
import { HomeStorySection } from "@/components/marketing/home-story-section"
import { HeroSection } from "@/components/marketing/hero-section"
import { buttonVariants } from "@/components/ui/button"
import { getSiteData } from "@/lib/data"
import { getI18n, getRequestLocale } from "@/lib/i18n/server"

export async function LandingScreen() {
  const locale = await getRequestLocale()
  const [siteData, { t }] = await Promise.all([
    getSiteData(locale),
    getI18n(locale, "marketing"),
  ])

  return (
    <FullpageScroll>
      {/* Section 1 — Hero */}
      <HeroSection
        ownerName={siteData.siteConfig.owner}
        labels={{
          badge: t("hero.badge", { owner: siteData.siteConfig.owner }),
          title: t("hero.title"),
          description: t("hero.description"),
          work: t("hero.work"),
          cv: t("hero.cv"),
          imageAlt: t("hero.imageAlt"),
          note: t("hero.note"),
          scrollDown: t("hero.scrollDown"),
        }}
      />

      {/* Section 2 — Story */}
      <HomeStorySection />

      {/* Section 3 — Projects CTA */}
      <section className="relative flex h-full items-center justify-center overflow-hidden px-8 py-12 text-center md:px-16">
        <Image
          src="/images/abdullahalmaksud/transparent.svg"
          alt=""
          width={360}
          height={388}
          unoptimized
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 max-h-[55vh] w-auto -translate-x-1/2 opacity-[0.04]"
        />
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
          <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
            Project room
          </p>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-balance md:text-6xl">
            You want to see my projects?
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
            Please step into the project section. The work is arranged as small
            windows into the products, tools, and experiments I keep shaping.
          </p>
          <Link
            href="/projects"
            className={buttonVariants({
              size: "lg",
              className:
                "mt-10 h-11 rounded-xl px-7 shadow-lg shadow-primary/20",
            })}
          >
            See the projects
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </FullpageScroll>
  )
}
