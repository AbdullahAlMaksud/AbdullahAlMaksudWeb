import {
  BarChart3,
  BookOpen,
  FolderKanban,
  LayoutDashboard,
  Mail,
  Newspaper,
  Settings,
} from "lucide-react"

export const dashboardNav = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { label: "Blog Posts", href: "/dashboard/blog", icon: Newspaper },
  { label: "Books", href: "/dashboard/books", icon: BookOpen },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Messages", href: "/dashboard/messages", icon: Mail },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]
