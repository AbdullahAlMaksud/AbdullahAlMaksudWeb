# Abdullah Al Maksud — Official Portfolio Website

> Editorial portfolio and monographs covering Literary & Technical Translation, Product & Design Systems, Web & Mobile App Solutions, and Enterprise Architecture.

---

## 🌟 Overview

**Abdullah Al Maksud Portfolio** (`AbdullahAlMaksudWeb`) is an editorial web application built with **Next.js 16 (Turbopack)**, **React 19**, and **Tailwind CSS**. It delivers high-fidelity typography, smooth kinetic interactions, and dynamic content delivery powered by the decoupled **Abdullah Al Maksud API Server**.

---

## 🚀 Tech Stack & Architecture

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, SSG & Server Components)
- **UI & Styling**: [Tailwind CSS v4](https://tailwindcss.com/), Radix UI Primitives, Lucide Icons
- **Kinetic Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Motion**: [Framer Motion](https://www.framer.com/motion/)
- **State & Data Fetching**: [TanStack Query v5](https://tanstack.com/query/latest) & [Axios](https://axios-http.com/)
- **Typography**: Custom local Bengali typography (Purno), Google Fonts (Inter, Newsreader, JetBrains Mono)
- **Backend Architecture**: Decoupled Hono REST API (`AbdullahAlMaksudServer`)
- **Package Manager**: [pnpm](https://pnpm.io/) (Strictly required)

---

## 🏁 Getting Started

### 1. Prerequisites

- **Node.js**: `v20.x` or higher
- **pnpm**: `v9.x` or higher (`corepack enable pnpm`)

### 2. Install Dependencies

> ⚠️ **Important**: Only `pnpm` is permitted in this codebase.

```bash
pnpm install
```

### 3. Configure Environment Variables

Copy the template file to `.env.local`:

```bash
cp .env.example .env.local
```

Verify your local endpoints in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Start Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the portfolio.

---

## ⚙️ Environment Variables

The portfolio frontend maintains only client-safe public variables. All mail services (Resend), database operations, and secret tokens are strictly handled on the backend server (`AbdullahAlMaksudServer`):

| Variable               | Type       | Local Default           | Production Target                         | Description                       |
| :--------------------- | :--------- | :---------------------- | :---------------------------------------- | :-------------------------------- |
| `NEXT_PUBLIC_API_URL`  | Public URL | `http://localhost:5000` | `https://api-abdullahalmaksud.vercel.app` | Backend Hono API base URL         |
| `NEXT_PUBLIC_SITE_URL` | Public URL | `http://localhost:3000` | `https://abdullahalmaksud.com`            | Canonical base URL of the website |

> 🔒 **Security Notice**: All sensitive secrets and server keys (`RESEND_API_KEY`, `BETTER_AUTH_SECRET`, `MONGODB_URI`, OAuth credentials, etc.) are strictly maintained on the backend server (`AbdullahAlMaksudServer`) and are never exposed to this client application.

### Environment Files

- [`.env.local`](.env.local): Local development settings (active by default, gitignored).
- [`.env.production`](.env.production): Production build configuration (used during `next build` and Vercel deployments).
- [`.env.example`](.env.example): Committed template for quick developer setup.

---

## 🛠️ Available Scripts

| Command             | Description                                                   |
| :------------------ | :------------------------------------------------------------ |
| `pnpm dev`          | Starts Next.js development server on port 3000 with Turbopack |
| `pnpm build`        | Compiles optimized production build (`next build`)            |
| `pnpm start`        | Launches production server on port 3000                       |
| `pnpm lint`         | Runs ESLint analysis across the repository                    |
| `pnpm format`       | Formats all files using Prettier                              |
| `pnpm format:check` | Checks code formatting against Prettier standards             |
| `pnpm validate`     | Runs linter and code style checks                             |

---

## 📁 Project Structure

```
AbdullahAlMaksudWeb/
├── public/                     # Static assets, CV documents, local Purno fonts, videos
├── src/
│   ├── app/                    # Next.js App Router (pages, dynamic slugs, layout)
│   │   ├── about/              # About page
│   │   ├── blog/               # Blog archive and [slug] articles
│   │   ├── books/              # Books and monographs
│   │   ├── contact/            # Direct consultation dispatch screen
│   │   ├── layout.tsx          # Root layout with Lenis & Query providers
│   │   └── page.tsx            # Editorial homepage
│   ├── components/             # UI components, modals, navigation, hero sections
│   ├── data/                   # Default offline portfolio datasets & static content
│   ├── lib/
│   │   ├── api/                # API client (Axios) and endpoints (contact, projects, blogs)
│   │   └── utils.ts            # Class merging and layout utilities
│   ├── screens/                # Screen-level composite sections
│   └── types/                  # TypeScript interface definitions
├── .env.example                # Environment variables template
├── next.config.ts              # Next.js configuration & redirects
└── package.json                # Project dependencies & scripts
```

---

## 🚀 Deployment

The portfolio is optimized for deployment on **Vercel**:

1. Connect the GitHub repository to your Vercel team.
2. In Project Settings > Environment Variables, configure:
   - `NEXT_PUBLIC_API_URL`: `https://api-abdullahalmaksud.vercel.app`
   - `NEXT_PUBLIC_SITE_URL`: `https://abdullahalmaksud.com`
3. Deploy! Next.js will automatically run `pnpm build` and generate static pages with incremental server rendering.
