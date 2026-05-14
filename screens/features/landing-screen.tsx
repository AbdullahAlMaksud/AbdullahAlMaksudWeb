import { BooksSection } from "@/components/marketing/books-section"
import { FeaturedProjects } from "@/components/marketing/featured-projects"
import { HeroSection } from "@/components/marketing/hero-section"
import { LatestBlogSection } from "@/components/marketing/latest-blog-section"
import { SiteFooter } from "@/components/marketing/site-footer"
import { SkillsExperience } from "@/components/marketing/skills-experience"
import { TestimonialsCTA } from "@/components/marketing/testimonials-cta"
import { getContentData, getSiteData } from "@/lib/data"
import { getContentLabels } from "@/lib/i18n/content-labels"
import { getI18n, getRequestLocale } from "@/lib/i18n/server"

export async function LandingScreen() {
  const locale = await getRequestLocale()
  const [{ books, blogPosts, projects }, siteData, { t }] = await Promise.all([
    getContentData(locale),
    getSiteData(locale),
    getI18n(locale, "marketing"),
  ])
  const contentLabels = getContentLabels(t)

  return (
    <>
      <HeroSection
        labels={{
          badge: t("hero.badge", { owner: siteData.siteConfig.owner }),
          title: t("hero.title"),
          description: t("hero.description"),
          work: t("hero.work"),
          cv: t("hero.cv"),
          imageAlt: t("hero.imageAlt"),
          note: t("hero.note"),
        }}
        techStack={siteData.techStack}
      />
      <FeaturedProjects
        labels={{
          eyebrow: t("home.featured.eyebrow"),
          title: t("home.featured.title"),
          description: t("home.featured.description"),
          all: t("home.featured.all"),
          project: t("home.featured.project"),
          categories: contentLabels.projectCategories,
        }}
        projects={projects}
      />
      <LatestBlogSection
        blogPosts={blogPosts}
        labels={{
          eyebrow: t("home.latestBlog.eyebrow"),
          title: t("home.latestBlog.title"),
          description: t("home.latestBlog.description"),
          read: t("home.latestBlog.read"),
          categories: contentLabels.blogCategories,
        }}
      />
      <BooksSection
        books={books}
        labels={{
          eyebrow: t("home.books.eyebrow"),
          title: t("home.books.title"),
          description: t("home.books.description"),
          browse: t("home.books.browse"),
          complete: (value) => t("home.books.complete", { value }),
        }}
      />
      <SkillsExperience
        experience={siteData.experience}
        labels={{
          eyebrow: t("home.skills.eyebrow"),
          title: t("home.skills.title"),
          description: t("home.skills.description"),
          timeline: t("home.skills.timeline"),
        }}
        skillGroups={siteData.skillGroups}
      />
      <TestimonialsCTA
        labels={{
          eyebrow: t("home.testimonials.eyebrow"),
          title: t("home.testimonials.title"),
          contact: t("home.testimonials.contact"),
          ctaTitle: t("home.testimonials.ctaTitle"),
          start: t("home.testimonials.start"),
        }}
        site={siteData.siteConfig}
        testimonials={siteData.testimonials}
      />
      <SiteFooter
        labels={{
          eyebrow: t("footer.eyebrow"),
          description: t("footer.description"),
          email: t("footer.email"),
          navigation: t("footer.navigation"),
          social: t("footer.social"),
          copyright: t("footer.copyright"),
        }}
        nav={siteData.marketingNav}
        site={siteData.siteConfig}
      />
    </>
  )
}
