import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/books",
        destination: "/#books",
        permanent: false,
      },
      {
        source: "/book",
        destination: "/#books",
        permanent: false,
      },
      {
        source: "/book/:slug",
        destination: "/books/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
