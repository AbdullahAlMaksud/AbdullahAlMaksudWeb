import Link from "next/link"
import { ArrowUpRight, Mail } from "lucide-react"

import type { NavItem, SiteConfig } from "@/types/content"

export function SiteFooter({
  labels,
  nav,
  site,
}: {
  labels: {
    eyebrow: string
    description: string
    email: string
    navigation: string
    social: string
    copyright: string
  }
  nav: NavItem[]
  site: SiteConfig
}) {
  return (
    <footer className="border-t bg-background/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
            {labels.eyebrow}
          </p>
          <h2 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight">
            {site.owner}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            {labels.description}
          </p>
          <Link
            href={`mailto:${site.email}`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <Mail className="size-4" />
            {labels.email}
          </Link>
        </div>
        <FooterLinks title={labels.navigation} items={nav} />
        <FooterLinks title={labels.social} items={site.socials} external />
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>{site.name}</span>
        <span>
          © {new Date().getFullYear()} {labels.copyright}
        </span>
      </div>
    </footer>
  )
}

function FooterLinks({
  external,
  items,
  title,
}: {
  external?: boolean
  items: NavItem[]
  title: string
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <Link
            key={`${title}-${item.href}`}
            href={item.href}
            className="inline-flex w-fit items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground"
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
          >
            {item.label}
            {external ? <ArrowUpRight className="size-3.5" /> : null}
          </Link>
        ))}
      </div>
    </div>
  )
}
