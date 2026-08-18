import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { LenisProvider } from "@/providers/LenisProvider";
import { CustomCursor } from "@/components/CustomCursor";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const cursive = Caveat({
  subsets: ["latin"],
  variable: "--font-cursive",
  weight: ["400", "700"],
});

const BASE_URL = "https://abdullahalmaksud.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  /* ── Core ─────────────────────────────────────────────────────── */
  title: {
    default: "Abdullah Al Maksud — Programmer. Writer. Designer.",
    template: "%s | Abdullah Al Maksud",
  },
  description:
    "Abdullah Al Maksud is a full-stack developer, UI/UX designer, and writer from Bangladesh. He builds digital products that solve real problems using React, Next.js, and React Native.",
  keywords: [
    "Abdullah Al Maksud",
    "full-stack developer Bangladesh",
    "Next.js developer",
    "React Native developer",
    "UI UX designer Bangladesh",
    "software engineer Bangladesh",
    "web developer portfolio",
    "programmer writer designer",
  ],
  authors: [{ name: "Abdullah Al Maksud", url: BASE_URL }],
  creator: "Abdullah Al Maksud",
  publisher: "Abdullah Al Maksud",

  /* ── Canonical & Robots ────────────────────────────────────────── */
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /* ── Open Graph ────────────────────────────────────────────────── */
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Abdullah Al Maksud",
    title: "Abdullah Al Maksud — Programmer. Writer. Designer.",
    description:
      "Full-stack developer, UI/UX designer, and writer from Bangladesh. Building digital products that solve real problems.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abdullah Al Maksud — Programmer. Writer. Designer.",
      },
    ],
  },

  /* ── Twitter / X Card ──────────────────────────────────────────── */
  twitter: {
    card: "summary_large_image",
    site: "@abdullahalmaksud",
    creator: "@abdullahalmaksud",
    title: "Abdullah Al Maksud — Programmer. Writer. Designer.",
    description:
      "Full-stack developer, UI/UX designer, and writer from Bangladesh.",
    images: ["/og-image.png"],
  },

  /* ── Verification (add your codes here) ───────────────────────── */
  verification: {
    // google: "your-google-site-verification-code",
    // yandex: "your-yandex-verification-code",
  },

  /* ── App / Manifest ────────────────────────────────────────────── */
  category: "technology",
};

/* ── JSON-LD Structured Data (Person schema) ───────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abdullah Al Maksud",
  url: BASE_URL,
  image: `${BASE_URL}/favicon.ico`,
  sameAs: [
    "https://github.com/abdullahalmaksud",
    "https://linkedin.com/in/abdullahalmaksud",
    "https://twitter.com/abdullahalmaksud",
  ],
  jobTitle: "Full-Stack Developer & UI/UX Designer",
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
  knowsAbout: [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "React",
    "Next.js",
    "React Native",
    "TypeScript",
  ],
  nationality: {
    "@type": "Country",
    name: "Bangladesh",
  },
  description:
    "Abdullah Al Maksud is a full-stack developer, UI/UX designer, and writer from Bangladesh who builds digital products that solve real problems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${mono.variable} ${cursive.variable} font-sans bg-light-bg dark:bg-dark-bg text-light-text-main dark:text-dark-text-main antialiased transition-colors duration-300 selection:bg-gold selection:text-black`}
      >
        <script
          id="json-ld-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <LenisProvider>
            <CustomCursor />
            <div className="relative min-h-screen">
              {children}
            </div>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
