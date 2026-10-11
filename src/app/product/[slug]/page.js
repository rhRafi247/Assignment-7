import { getProducts, getProduct } from "@/lib/api";
import ProductDetailProtected from "./ProductDetailProtected";

export const dynamicParams = true;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.id.toString() }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "পণ্য পাওয়া যায়নি | বাজার দর",
      description: "অনুরোধকৃত পণ্যের বিবরণ পাওয়া যায়নি।",
    };
  }

  return {
    title: `${product.nameBn} এর আজকের বাজার দর ও বিবরণ | বাজার দর`,
    description: `${product.nameBn} এর আজকের বাজারদর ${product.today} টাকা। দেশের সকল প্রধান বাজারের সর্বোচ্চ, সর্বনিম্ন ও গড় দর জানুন।`,
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  return <ProductDetailProtected product={product} slug={slug} />;
}
