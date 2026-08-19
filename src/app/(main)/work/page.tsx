import type { Metadata } from "next";
import { WorkHubScreen } from "@/screens/work/WorkHubScreen";

export const metadata: Metadata = {
  title: "Works — Abdullah Al Maksud",
  description:
    "Explore software engineering applications, brand designs, and books created by Abdullah Al Maksud.",
};

export default function WorkHubPage() {
  return <WorkHubScreen />;
}
