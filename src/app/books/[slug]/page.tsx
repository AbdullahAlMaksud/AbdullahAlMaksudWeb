import { BookDetailScreen } from "@/screens/BookDetailScreen";
import { getAllBookSlugs } from "@/data/book-data";

export const generateStaticParams = () => {
  return getAllBookSlugs().map((slug) => ({ slug }));
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return <BookDetailScreen slug={slug} />;
};

export default Page;
