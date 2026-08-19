# AM Portfolio — retro pixel style

Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui দিয়ে বানানো একটা full portfolio site, screenshot এর retro/pixel design অনুযায়ী।

## চালানো

```bash
pnpm install
pnpm dev
```

তারপর ব্রাউজারে `http://localhost:3000` ওপেন করো।

## Project structure

```
app/
  layout.tsx      # fonts (Press Start 2P + JetBrains Mono) + metadata
  page.tsx         # পুরো পেজ: nav, hero, skills, projects, book/stats, blog/designs, footer
  globals.css      # cream/green/orange palette + retro ".win" window-chrome styles
components/
  WindowFrame.tsx  # about_me.exe স্টাইলের title-bar window wrapper
  ProjectCard.tsx  # featured projects গ্রিডের কার্ড
  ui/button.tsx    # shadcn button component
lib/
  utils.ts         # cn() helper
tailwind.config.ts
components.json     # shadcn config
```

## যা customize করতে হবে

1. **Hero photo** — `app/page.tsx`-এ `about_me.exe` window এর ভেতরের placeholder `<div>` টা নিজের ছবি দিয়ে বদলাও:
   ```tsx
   import Image from "next/image";
   // ...
   <div className="bg-green-dark relative h-[380px] overflow-hidden">
     <Image src="/your-photo.jpg" alt="Abdullah Al Maksud" fill className="object-cover" />
   </div>;
   ```
   ছবিটা `public/` ফোল্ডারে রাখবে।
2. **Project thumbnails** — `PROJECTS` array-এর `imageBg` এখন flat color; চাইলে `ProjectCard.tsx`-এ `next/image` দিয়ে actual screenshot বসাও।
3. **Book cover ও blog/design thumbnails** — একইভাবে placeholder div গুলো replace করো।
4. **Links** — nav, social icons, বাটনগুলো এখনো `href="#"` — নিজের actual routes/urls বসাও।
5. টেক্সট/নাম/bio সব নিজের data দিয়ে বদলে নাও (`app/page.tsx`-এর উপরের দিকে `NAV_LINKS`, `SKILLS`, `PROJECTS`, `STATS` arrays)।

## Design notes

- Palette: cream `#f2ede1` bg, ink `#1e1c17` text, forest green `#3f5d48`, terracotta `#d2571f` accent।
- retro "window" look (title bar + hard drop-shadow border) `.win` / `.win-titlebar` class দিয়ে করা — `app/globals.css`-এ definition, এটাই design এর signature element।
- সব বাটন `rounded-none` — sharp/pixel edge এর জন্য।
- নতুন shadcn component লাগলে: `npx shadcn@latest add <component-name>`
