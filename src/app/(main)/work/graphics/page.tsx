import type { Metadata } from "next";
import { GraphicsScreen } from "@/screens/work/GraphicsScreen";

export const metadata: Metadata = {
  title: "Graphic Design — Abdullah Al Maksud",
  description: "Brand identities, posters, and visual communication design by Abdullah Al Maksud.",
};

export default function GraphicDesignsPage() {
  return <GraphicsScreen />;
}
