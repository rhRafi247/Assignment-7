import { getProducts, getTopRisers, getTopFallers, toBengaliNumber } from "@/lib/api";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";

export default async function HomePage() {
  const products = await getProducts();
  const risers = getTopRisers(products, 6);
  const fallers = getTopFallers(products, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* 2. Hero / Banner */}
      <Hero />

      {/* 3. Section A — আজ দাম বেড়েছে ▲ */}
      <section className="mb-12 sm:mb-16">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-red-500 font-bold text-lg sm:text-xl">▲</span>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            আজ দাম বেড়েছে
          </h2>
          <span className="text-xs sm:text-sm text-gray-400 font-medium ml-2">
            (শীর্ষ ৬টি পণ্য)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {risers.map((product) => (
            <ProductCard key={`riser-${product.id}`} product={product} />
          ))}
        </div>
      </section>

      {/* 3. Section B — আজ দাম কমেছে ▼ */}
      <section className="mb-12 sm:mb-16">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-emerald-600 font-bold text-lg sm:text-xl">▼</span>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            আজ দাম কমেছে
          </h2>
          <span className="text-xs sm:text-sm text-gray-400 font-medium ml-2">
            (শীর্ষ ৬টি পণ্য)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {fallers.map((product) => (
            <ProductCard key={`faller-${product.id}`} product={product} />
          ))}
        </div>
      </section>

      {/* 3. Section C — সব পণ্য (Target of #সব-পণ্য anchor) */}
      <section id="সব-পণ্য" className="scroll-mt-24 mb-14">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            সব পণ্য
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            মোট {toBengaliNumber(products.length)}টি পণ্য | প্রতিটি পণ্যের বিস্তারিত দেখতে ক্লিক করুন
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={`all-${product.id}`} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
