import type { Metadata } from "next";
import { BlogsScreen } from "@/screens/blogs/BlogsScreen";

export const metadata: Metadata = {
  title: "Writing & Blogs — Abdullah Al Maksud",
  description: "Thoughts on programming, software craft, mindset, productivity, and life.",
};

export default function BlogsPage() {
  return <BlogsScreen />;
}
