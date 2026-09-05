import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import "./globals.css";

const purno = localFont({
  src: [
    {
      path: "../../public/font/Purno Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/Purno Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/font/Purno Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/font/Purno Bold-Italic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-purno",
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Abdullah Al Maksud — Lead Architect & Consultant",
  description:
    "Editorial portfolio of Abdullah Al Maksud. Translation, Design Systems, Web & App Engineering, and Enterprise Architecture.",
  keywords: [
    "Abdullah Al Maksud",
    "Lead Architect",
    "Strategic Implementation",
    "Translation",
    "Design Systems",
    "Web Development",
    "Mobile Apps",
    "Portfolio",
  ],
  authors: [{ name: "Abdullah Al Maksud" }],
  openGraph: {
    title: "Abdullah Al Maksud — Lead Architect & Consultant",
    description:
      "Editorial portfolio and monographs covering Translation, UI/UX Design, Web & App Solutions, and Enterprise Architecture.",
    type: "website",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html
      lang="en"
      className={`${purno.variable} ${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white">
        <LenisProvider>
          <QueryProvider>{children}</QueryProvider>
        </LenisProvider>
      </body>
    </html>
  );
};

export default RootLayout;
