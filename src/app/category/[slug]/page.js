import { getCategories, getCategory, getProducts } from "@/lib/api";
import CategoryContent from "./CategoryContent";

export const dynamicParams = true;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug || c.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return {
      title: "বিভাগ পাওয়া যায়নি | বাজার দর",
      description: "অনুরোধকৃত ক্যাটাগরিটি খুঁজে পাওয়া যায়নি।",
    };
  }

  return {
    title: `${category.nameBn} এর আজকের বাজার দর | বাজার দর`,
    description: `${category.nameBn} বিভাগের সকল পণ্যের সর্বশেষ বাজার দর, গড় মূল্য ও পরিবর্তন জানুন।`,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const [category, products] = await Promise.all([
    getCategory(slug),
    getProducts(slug),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <CategoryContent category={category} products={products} slug={slug} />
    </div>
  );
}
