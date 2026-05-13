import type { Metadata } from "next"

import "./globals.css"
import { siteConfig } from "@/constants/site"
import { AppProviders } from "@/providers/app-providers"

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.owner} - ${siteConfig.name}`,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
