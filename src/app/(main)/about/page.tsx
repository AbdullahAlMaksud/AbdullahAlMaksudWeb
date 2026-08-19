import type { Metadata } from "next";
import AboutScreen from "@/screens/about/about-screen";

export const metadata: Metadata = {
  title: "About — Abdullah Al Maksud",
  description:
    "Learn about Abdullah Al Maksud — Full-Stack Developer, UI/UX Designer, and Author from Bangladesh. Explore work experience, education background, and capabilities.",
};

export default function AboutPage() {
  return <AboutScreen />;
}
