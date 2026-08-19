import type { Metadata } from "next";
import { BookScreen } from "@/screens/work/BookScreen";

export const metadata: Metadata = {
  title: "Books & Publications — Abdullah Al Maksud",
  description: "Popular science books and publications by author Abdullah Al Maksud.",
};

export default function BookPage() {
  return <BookScreen />;
}
