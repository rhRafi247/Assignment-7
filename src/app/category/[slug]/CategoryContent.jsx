"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { toBengaliNumber } from "@/lib/api";
import { ChevronDown, ArrowLeft, ShoppingBag } from "lucide-react";

export default function CategoryContent({ category, products = [], slug }) {
  const [sortOption, setSortOption] = useState("default");

  // Challenge C1: Sort numeric values accurately
  const sortedProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    const list = [...products];

    if (sortOption === "price_asc") {
      // দাম: কম থেকে বেশি (numeric ascending)
      return list.sort((a, b) => Number(a.today) - Number(b.today));
    } else if (sortOption === "price_desc") {
      // দাম: বেশি থেকে কম (numeric descending)
      return list.sort((a, b) => Number(b.today) - Number(a.today));
    }

    // Default order
    return list;
  }, [products, sortOption]);

  if (!category && products.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center">
        <div className="w-20 h-20 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-amber-600">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          বিভাগটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          অনুরোধকৃত &quot;{slug}&quot; বিভাগে কোনো তথ্য নেই অথবা বিভাগটি বিদ্যমান নয়।
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#0b7a49] hover:bg-[#08613a] rounded-xl shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    );
  }

  const categoryName = category?.nameBn || slug;
  const categoryIcon = category?.icon || "🛒";
  const countBn = toBengaliNumber(sortedProducts.length);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Category Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex items-center gap-5">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#0b7a49]/10 flex items-center justify-center text-3xl sm:text-4xl shrink-0">
          {categoryIcon}
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {categoryName}
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            {countBn}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {/* Filter / Sort Control Row (Challenge C1) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-gray-100">
        <div className="text-xs sm:text-sm text-gray-500 font-medium">
          মোট {countBn}টি পণ্য দেখানো হচ্ছে
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <label htmlFor="sort-select" className="text-xs sm:text-sm font-medium text-gray-600">
            সাজান:
          </label>
          <div className="relative inline-block">
            <select
              id="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none bg-white border border-gray-200 text-gray-800 text-xs sm:text-sm font-medium rounded-xl pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-[#0b7a49]/20 focus:border-[#0b7a49] cursor-pointer shadow-sm"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price_asc">দাম: কম থেকে বেশি</option>
              <option value="price_desc">দাম: বেশি থেকে কম</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Product Cards Grid or Empty State */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={`cat-${product.id}`} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm my-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
            🌾
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            কোনো পণ্য পাওয়া যায়নি
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            এই বিভাগে বর্তমানে কোনো পণ্যের তালিকা নেই।
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#0b7a49] hover:bg-[#08613a] rounded-xl transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      )}
    </div>
  );
}
