import type { PortfolioProject } from "@/types/content"

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "bonton",
    coverImage: "/images/project/bonton.png",
    logo: "/images/project/logo/bonton.png",
    title: "বন্টন",
    description:
      "Split any shared cost, then settle with fewer payments. Local-first expense splitter for trips, food, rent, or any shared resource.",
    stack: ["React", "TypeScript", "Zustand", "Tailwind CSS", "Vite"],
    coreFeatures: [
      {
        icon: "receipt",
        text: "Add Expense",
        desc: "Track total cost with multiple initial payers",
      },
      {
        icon: "users",
        text: "Assign Payers",
        desc: "Multiple people can share the initial payment",
      },
      {
        icon: "user-check",
        text: "Choose Participants",
        desc: "Select who owes what in each expense",
      },
      {
        icon: "split",
        text: "Flexible Split",
        desc: "Equal, percentage, or fixed-amount splits",
      },
      {
        icon: "file-down",
        text: "Export Settlements",
        desc: "Copy or export optimised settlement report",
      },
    ],
    gitRepo: "https://github.com/abdullahmaksud/bonton",
    liveLink: "https://bonton.abdullahalmaksud.com",
    categories: ["saas", "finance", "tool"],
    tag: "Local-first settlement system",
    createdAt: "2025-11-01",
    lastUpdate: "2026-05-20",
    isFeatured: true,
    isArchived: false,
  },
  {
    id: "prishtha",
    coverImage: "/images/project/prishtha.png",
    logo: "/images/project/logo/prishtha.png",
    title: "পৃষ্ঠা",
    description:
      "A distraction-free writing workspace. Write, save, print, and export your work — no account required, everything stays in your browser.",
    stack: ["React", "TypeScript", "LocalStorage", "Tailwind CSS", "Vite"],
    coreFeatures: [
      {
        icon: "pen-line",
        text: "Minimal Editor",
        desc: "Clean title + body writing surface with zero clutter",
      },
      {
        icon: "save",
        text: "Save As",
        desc: "Name and persist drafts locally in the browser",
      },
      {
        icon: "printer",
        text: "Print",
        desc: "Send your writing directly to the printer",
      },
      {
        icon: "download",
        text: "Export",
        desc: "Download as plain text or formatted document",
      },
      {
        icon: "bar-chart-2",
        text: "Word Count",
        desc: "Live character and word count in the status bar",
      },
    ],
    gitRepo: "https://github.com/abdullahmaksud/prishtha",
    liveLink: "https://prishtha.abdullahalmaksud.com",
    categories: ["writing", "tool", "productivity"],
    tag: "Distraction-free editor",
    createdAt: "2025-08-15",
    lastUpdate: "2026-04-10",
    isFeatured: true,
    isArchived: false,
  },
  {
    id: "okkhor",
    coverImage: "/images/project/okkhor.png",
    logo: "/images/project/logo/okkhor.png",
    title: "শিশুশিক্ষা",
    description:
      "Interactive Bengali alphabet and rhymes learning app for children. Learn বর্ণমালা through pictures, sounds, and playful games.",
    stack: [
      "React",
      "TypeScript",
      "Framer Motion",
      "Tailwind CSS",
      "Howler.js",
    ],
    coreFeatures: [
      {
        icon: "book-open",
        text: "বর্ণমালা",
        desc: "স্বরবর্ণ ও ব্যঞ্জনবর্ণ with animated picture cards",
      },
      {
        icon: "mic",
        text: "Audio Pronunciation",
        desc: "Native audio for each letter and word",
      },
      {
        icon: "music",
        text: "ছড়া-কবিতা",
        desc: "Classic Bengali nursery rhymes with illustrations",
      },
      {
        icon: "gamepad-2",
        text: "Interactive Games",
        desc: "Match letters, trace, and identify sounds",
      },
      {
        icon: "star",
        text: "Progress Tracking",
        desc: "Stars and badges to encourage continued learning",
      },
    ],
    gitRepo: "https://github.com/abdullahmaksud/shishushikkha",
    liveLink: "https://okkhor.abdullahalmaksud.com",
    categories: ["education", "kids", "bengali"],
    tag: "Bengali learning for children",
    createdAt: "2025-06-01",
    lastUpdate: "2026-03-18",
    isFeatured: true,
    isArchived: false,
  },
  {
    id: "ghorial",
    coverImage: "/images/project/ghorial.png",
    logo: "/images/project/logo/ghorial.png",
    title: "Ghorial",
    description:
      "A minimal, full-screen clock and focus tool. Clock, stopwatch, countdown, and Pomodoro modes in one distraction-free interface.",
    stack: ["React", "TypeScript", "Framer Motion", "Tailwind CSS", "Zustand"],
    coreFeatures: [
      {
        icon: "clock",
        text: "World Clock",
        desc: "Full-screen live clock with date display",
      },
      {
        icon: "coffee",
        text: "Pomodoro",
        desc: "25/5 focus sessions with visual progress",
      },
      { icon: "timer", text: "Stopwatch", desc: "Precision lap stopwatch" },
      {
        icon: "hourglass",
        text: "Countdown",
        desc: "Custom countdown timer with alerts",
      },
      {
        icon: "pin",
        text: "Pinnable Sidebar",
        desc: "Minimal vertical nav with auto-hide and pin support",
      },
    ],
    gitRepo: "https://github.com/abdullahmaksud/focustimer",
    liveLink: "https://timer-tools-rho.vercel.app/",
    categories: ["productivity", "tool", "ui"],
    tag: "Minimal focus & time tool",
    createdAt: "2025-03-10",
    lastUpdate: "2026-06-01",
    isFeatured: false,
    isArchived: false,
  },
]
