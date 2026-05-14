export type LocaleCode = "en" | "bn"

export type ProjectCategory = "all" | "saas" | "writing" | "ai" | "motion"
export type ProjectStatus = "live" | "case-study" | "prototype"

export type Project = {
  id: string
  title: string
  slug: string
  category: Exclude<ProjectCategory, "all">
  description: string
  image: string
  stack: string[]
  status: ProjectStatus
  year: string
  links: {
    demo: string
    repo: string
  }
}

export type BlogCategory = "all" | "engineering" | "writing" | "design"

export type BlogPost = {
  id: string
  title: string
  slug: string
  category: Exclude<BlogCategory, "all">
  excerpt: string
  image: string
  date: string
  readTime: string
  featured?: boolean
  tags: string[]
  content: {
    heading: string
    body: string
    code?: string
  }[]
}

export type BookStatus = "drafting" | "editing" | "published"

export type Book = {
  id: string
  title: string
  subtitle: string
  cover: string
  progress: number
  tags: string[]
  status: BookStatus
  summary: string
}

export type SiteConfig = {
  name: string
  owner: string
  title: string
  description: string
  email: string
  resumeUrl: string
  socials: { label: string; href: string }[]
}

export type NavItem = {
  label: string
  href: string
}

export type TimelineItem = {
  year: string
  role: string
  company: string
  description: string
}

export type Testimonial = {
  quote: string
  name: string
  role: string
}

export type SkillGroup = {
  title: string
  items: string[]
}

export type DashboardStat = {
  label: string
  value: string
  delta: string
  tone: "violet" | "amber" | "emerald" | "rose"
}

export type ChartPoint = {
  name: string
  views: number
  reads: number
}

export type ActivityItem = {
  id: string
  title: string
  date: string
  tone: DashboardStat["tone"]
}

export type Message = {
  id: string
  name: string
  subject: string
  time: string
  unread?: boolean
}

export type Notification = {
  id: string
  title: string
  description: string
  time: string
}

export type TopReferrer = {
  source: string
  value: string
}

export type DashboardMetric = {
  label: string
  value: string
}

export type SiteData = {
  siteConfig: SiteConfig
  marketingNav: NavItem[]
  techStack: string[]
  skillGroups: SkillGroup[]
  experience: TimelineItem[]
  testimonials: Testimonial[]
}

export type ContentData = {
  projects: Project[]
  blogPosts: BlogPost[]
  books: Book[]
}

export type DashboardData = {
  dashboardStats: DashboardStat[]
  analyticsData: ChartPoint[]
  activities: ActivityItem[]
  messages: Message[]
  notifications: Notification[]
  topReferrers: TopReferrer[]
  metrics: DashboardMetric[]
}
