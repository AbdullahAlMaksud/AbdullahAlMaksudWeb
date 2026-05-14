# Backend Development Handoff

This document describes the backend API needed for this portfolio dashboard.
Build it in a separate repository with Node.js, Express, TypeScript, and MongoDB.

## Goal

The frontend currently reads local JSON through `lib/data.ts`. The backend should
replace that local source with HTTP APIs while keeping the response shapes close
to the current frontend types in `types/content.ts`.

## Recommended Stack

- Runtime: Node.js 24+
- Framework: Express
- Language: TypeScript
- Database: MongoDB Atlas or local MongoDB
- ODM: Mongoose
- Validation: Zod
- Auth: JWT or better-auth integration later
- Dev tools: tsx, eslint, prettier, vitest or node:test

## Environment Variables

```env
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio
FRONTEND_ORIGIN=http://localhost:3000
JWT_SECRET=replace-with-long-random-secret
```

## Local Setup

```bash
npm init -y
npm install express cors helmet mongoose zod dotenv morgan
npm install -D typescript tsx @types/express @types/cors @types/node eslint prettier
npx tsc --init
```

Suggested scripts: `dev`, `build`, `start`, `seed`, and `typecheck`.

## API Base

Use `/api/v1` as the base path.

Every localized read endpoint should accept:

```http
?locale=en
?locale=bn
```

If locale is missing or invalid, default to `en`.

## Data Model Strategy

Use a `locale` field for localized records. Keep shared identifiers such as
`slug` stable across languages.

Example project document:

```ts
{
  locale: "en",
  slug: "devboard",
  title: "DevBoard",
  category: "saas",
  description: "...",
  image: "/images/project-devboard.png",
  stack: ["Next.js", "TypeScript"],
  status: "live",
  year: "2026",
  links: {
    demo: "/dashboard",
    repo: "https://github.com"
  }
}
```

## Enums

Keep these values stable because the frontend maps labels with i18next.

```ts
const projectCategories = ["saas", "writing", "ai", "motion"] as const
const projectStatuses = ["live", "case-study", "prototype"] as const
const blogCategories = ["engineering", "writing", "design"] as const
const bookStatuses = ["drafting", "editing", "published"] as const
const locales = ["en", "bn"] as const
```

## Endpoints

### Site

```http
GET /api/v1/site?locale=en
```

Response:

```ts
{
  siteConfig: SiteConfig,
  marketingNav: NavItem[],
  techStack: string[],
  skillGroups: SkillGroup[],
  experience: TimelineItem[],
  testimonials: Testimonial[]
}
```

### Projects

```http
GET /api/v1/projects?locale=en
GET /api/v1/projects/:slug?locale=en
POST /api/v1/projects
PATCH /api/v1/projects/:id
DELETE /api/v1/projects/:id
```

Create body:

```ts
{
  locale: "en",
  title: string,
  slug: string,
  category: "saas" | "writing" | "ai" | "motion",
  description: string,
  image: string,
  stack: string[],
  status: "live" | "case-study" | "prototype",
  year: string,
  links: {
    demo: string,
    repo: string
  }
}
```

### Blog Posts

```http
GET /api/v1/blog-posts?locale=en
GET /api/v1/blog-posts/:slug?locale=en
POST /api/v1/blog-posts
PATCH /api/v1/blog-posts/:id
DELETE /api/v1/blog-posts/:id
```

Create body:

```ts
{
  locale: "en",
  title: string,
  slug: string,
  category: "engineering" | "writing" | "design",
  excerpt: string,
  image: string,
  date: string,
  readTime: string,
  featured?: boolean,
  tags: string[],
  content: {
    heading: string,
    body: string,
    code?: string
  }[]
}
```

### Books

```http
GET /api/v1/books?locale=en
GET /api/v1/books/:id?locale=en
POST /api/v1/books
PATCH /api/v1/books/:id
DELETE /api/v1/books/:id
```

Create body:

```ts
{
  locale: "en",
  title: string,
  subtitle: string,
  cover: string,
  progress: number,
  tags: string[],
  status: "drafting" | "editing" | "published",
  summary: string
}
```

### Dashboard

```http
GET /api/v1/dashboard?locale=en
GET /api/v1/dashboard/analytics?locale=en
GET /api/v1/messages?locale=en
GET /api/v1/notifications?locale=en
```

For the first backend version, dashboard metrics can be seeded from
`constants/data/{locale}/dashboard.json`.

## Response Format

Use a consistent envelope for mutations and errors:

```ts
{
  data: unknown,
  message?: string
}
```

Error response:

```ts
{
  error: {
    code: "VALIDATION_ERROR",
    message: "Invalid request payload",
    details?: unknown
  }
}
```

## Seed Data

Copy these frontend files into the backend seed script:

- `constants/data/en/site.json`
- `constants/data/en/content.json`
- `constants/data/en/dashboard.json`
- `constants/data/bn/site.json`
- `constants/data/bn/content.json`
- `constants/data/bn/dashboard.json`

The seed script should upsert by `{ locale, slug }` for projects and blog posts.
For books, use `{ locale, id }` or generate MongoDB IDs and store a stable `uid`.

## Frontend Integration Plan

When the backend is ready, update `lib/data.ts` in the frontend:

```ts
const API_URL = process.env.NEXT_PUBLIC_API_URL

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    next: { revalidate: 60 }
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  return response.json()
}
```

Then replace local JSON reads with API calls:

```ts
export async function getContentData(locale: Locale) {
  const [projects, blogPosts, books] = await Promise.all([
    fetchJson<Project[]>(`/api/v1/projects?locale=${locale}`),
    fetchJson<BlogPost[]>(`/api/v1/blog-posts?locale=${locale}`),
    fetchJson<Book[]>(`/api/v1/books?locale=${locale}`)
  ])

  return { projects, blogPosts, books }
}
```

## Prompt For Backend Repo

Use this prompt in the new backend repository:

```text
Create a Node.js, Express, TypeScript, and MongoDB backend for a bilingual portfolio dashboard.
Follow docs/backend-development.md from the frontend repo. Implement Mongoose models, Zod
validation, CRUD routes for projects/blog posts/books, localized read endpoints using
?locale=en|bn, seed scripts from the frontend JSON files, CORS, and consistent errors.
Keep files under 300 lines, use strict TypeScript, and include README setup instructions.
```
