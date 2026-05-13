import type {
  ActivityItem,
  BlogPost,
  Book,
  ChartPoint,
  DashboardStat,
  Message,
  Notification,
  Project,
} from "@/types/content"

export const projects: Project[] = [
  {
    id: "p1",
    title: "DevBoard",
    slug: "devboard",
    category: "SaaS",
    description:
      "A modern developer dashboard for tracking content, projects, and portfolio metrics.",
    image: "/images/project-devboard.png",
    stack: ["Next.js", "TypeScript", "Recharts", "Tailwind"],
    status: "Live",
    year: "2026",
    links: { demo: "/dashboard", repo: "https://github.com" },
  },
  {
    id: "p2",
    title: "NoteForge",
    slug: "noteforge",
    category: "Writing",
    description:
      "A focused writing workspace for turning research notes into published essays.",
    image: "/images/project-noteforge.png",
    stack: ["React", "Zustand", "MDX", "Framer Motion"],
    status: "Case Study",
    year: "2025",
    links: { demo: "/projects", repo: "https://github.com" },
  },
  {
    id: "p3",
    title: "Signal Labs",
    slug: "signal-labs",
    category: "AI",
    description:
      "An AI-assisted research surface for sorting product signals and content ideas.",
    image: "/images/project-signal.png",
    stack: ["Next.js", "AI SDK", "TanStack Query", "shadcn/ui"],
    status: "Prototype",
    year: "2025",
    links: { demo: "/projects", repo: "https://github.com" },
  },
  {
    id: "p4",
    title: "LaunchPad Motion",
    slug: "launchpad-motion",
    category: "Motion",
    description:
      "A motion study system for product launches, reveals, and micro-interactions.",
    image: "/images/project-launchpad.png",
    stack: ["Framer Motion", "React", "Tailwind", "Lucide"],
    status: "Live",
    year: "2024",
    links: { demo: "/projects", repo: "https://github.com" },
  },
]

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "Understanding Server Components in Next.js",
    slug: "understanding-server-components",
    category: "Engineering",
    excerpt:
      "A practical walkthrough of where Server Components shine and how to keep interactivity focused.",
    image: "/images/blog-server-components.png",
    date: "May 18, 2026",
    readTime: "6 min read",
    featured: true,
    tags: ["Next.js", "React", "Architecture"],
    content: [
      {
        heading: "Start With Boundaries",
        body:
          "Server Components work best when you treat them as a boundary for data, composition, and stable markup. Push browser state down into small islands instead of making the whole page interactive.",
      },
      {
        heading: "Keep Client State Local",
        body:
          "The payoff is not only smaller bundles. It is also a cleaner mental model where interaction is obvious because it lives near the controls that need it.",
        code:
          "export default async function Page() {\n  const posts = await getPosts()\n  return <PostList posts={posts} />\n}",
      },
      {
        heading: "Design For Change",
        body:
          "The best split is usually boring: server for durable content, client for transitions, forms, filters, and real-time interface feedback.",
      },
    ],
  },
  {
    id: "b2",
    title: "A Writing System for Technical Ideas",
    slug: "writing-system-for-technical-ideas",
    category: "Writing",
    excerpt:
      "How to move from scattered engineering notes to essays with shape, rhythm, and useful examples.",
    image: "/images/blog-writing-systems.png",
    date: "April 28, 2026",
    readTime: "5 min read",
    tags: ["Writing", "Process", "Knowledge"],
    content: [
      {
        heading: "Capture Before You Polish",
        body:
          "A reliable writing system lowers the cost of starting. Keep raw notes, examples, and questions in separate places before forcing them into an article.",
      },
      {
        heading: "Make The Reader Safer",
        body:
          "Strong technical writing reduces uncertainty. It names tradeoffs, shows failure cases, and gives readers landmarks as they move through the idea.",
      },
    ],
  },
  {
    id: "b3",
    title: "Motion Details That Make Interfaces Feel Calm",
    slug: "motion-details-that-feel-calm",
    category: "Design",
    excerpt:
      "A small set of motion principles for polished product surfaces without making the UI feel busy.",
    image: "/images/blog-motion.png",
    date: "March 12, 2026",
    readTime: "4 min read",
    tags: ["Motion", "Design", "UX"],
    content: [
      {
        heading: "Motion Has A Job",
        body:
          "Good motion gives feedback, explains spatial relationships, and makes state changes legible. It should rarely ask to be admired on its own.",
      },
      {
        heading: "Prefer Short Distances",
        body:
          "Tiny movements, mild opacity changes, and consistent easing make a product feel responsive without getting theatrical.",
      },
    ],
  },
]

export const books: Book[] = [
  {
    id: "book-1",
    title: "Code Diary",
    subtitle: "A collection of thoughtful engineering field notes.",
    cover: "/images/book-code-diary.png",
    progress: 82,
    tags: ["Engineering", "Essays", "React"],
    status: "Editing",
    summary:
      "Short essays on the everyday decisions that shape better frontend systems.",
  },
  {
    id: "book-2",
    title: "Interface Essays",
    subtitle: "Design notes for builders who care about clarity.",
    cover: "/images/book-interface-essays.png",
    progress: 64,
    tags: ["Design", "UX", "Systems"],
    status: "Drafting",
    summary:
      "A practical guide to making product interfaces feel deliberate and humane.",
  },
  {
    id: "book-3",
    title: "Small Systems",
    subtitle: "Patterns for sustainable personal software.",
    cover: "/images/book-small-systems.png",
    progress: 100,
    tags: ["Product", "Writing", "Tools"],
    status: "Published",
    summary:
      "A book about building lightweight systems that support creative work over time.",
  },
]

export const dashboardStats: DashboardStat[] = [
  { label: "Projects", value: "12", delta: "+2 this month", tone: "violet" },
  { label: "Blog Posts", value: "24", delta: "+5 this month", tone: "amber" },
  { label: "Books", value: "3", delta: "+1 this month", tone: "emerald" },
  { label: "Messages", value: "8", delta: "+2 this week", tone: "rose" },
]

export const analyticsData: ChartPoint[] = [
  { name: "Apr 20", views: 520, reads: 260 },
  { name: "Apr 24", views: 860, reads: 410 },
  { name: "Apr 28", views: 680, reads: 340 },
  { name: "May 2", views: 1260, reads: 620 },
  { name: "May 6", views: 940, reads: 510 },
  { name: "May 10", views: 1210, reads: 710 },
  { name: "May 14", views: 760, reads: 390 },
  { name: "May 18", views: 1120, reads: 650 },
]

export const activities: ActivityItem[] = [
  { id: "a1", title: "New project DevBoard added", date: "May 18, 2026", tone: "rose" },
  { id: "a2", title: "Blog post Understanding Server Components published", date: "May 17, 2026", tone: "violet" },
  { id: "a3", title: "Book Code Diary moved to editing", date: "May 16, 2026", tone: "amber" },
  { id: "a4", title: "Portfolio analytics crossed 10k views", date: "May 15, 2026", tone: "emerald" },
]

export const messages: Message[] = [
  { id: "m1", name: "Mohammad Al Amin", subject: "Loved the React Server Components article", time: "2h", unread: true },
  { id: "m2", name: "Sadia Afrin", subject: "Can we discuss a writing dashboard?", time: "1d", unread: true },
  { id: "m3", name: "Tanvir Hasan", subject: "Collaboration idea for a motion system", time: "2d" },
]

export const notifications: Notification[] = [
  {
    id: "n1",
    title: "Weekly digest is ready",
    description: "Portfolio visits rose 18% compared with last week.",
    time: "15m",
  },
  {
    id: "n2",
    title: "New message",
    description: "Sadia asked about a dashboard collaboration.",
    time: "1h",
  },
  {
    id: "n3",
    title: "Draft reminder",
    description: "Interface Essays has 3 sections ready for review.",
    time: "1d",
  },
]

export const topReferrers = [
  { source: "GitHub", value: "1,240" },
  { source: "Google", value: "980" },
  { source: "Twitter", value: "460" },
  { source: "LinkedIn", value: "320" },
  { source: "YouTube", value: "210" },
]
