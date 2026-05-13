export type ProjectCategory = "All" | "SaaS" | "Writing" | "AI" | "Motion"

export type Project = {
  id: string
  title: string
  slug: string
  category: Exclude<ProjectCategory, "All">
  description: string
  image: string
  stack: string[]
  status: "Live" | "Case Study" | "Prototype"
  year: string
  links: {
    demo: string
    repo: string
  }
}

export type BlogCategory = "All" | "Engineering" | "Writing" | "Design"

export type BlogPost = {
  id: string
  title: string
  slug: string
  category: Exclude<BlogCategory, "All">
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

export type Book = {
  id: string
  title: string
  subtitle: string
  cover: string
  progress: number
  tags: string[]
  status: "Drafting" | "Editing" | "Published"
  summary: string
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
