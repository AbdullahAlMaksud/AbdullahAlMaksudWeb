const backendApiUrl = (
  process.env.BACKEND_API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "https://api.abdullahalmaksud.com"
).replace(/\/$/, "")

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/api/auth/:path*",
          destination: `${backendApiUrl}/api/auth/:path*`,
        },
      ],
    }
  },
}

export default nextConfig
