"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import {
  formatBengaliCurrency,
  formatBengaliPercent,
  formatBengaliUnit,
  toBengaliNumber,
} from "@/lib/api";
import toast from "react-hot-toast";
import { ChevronRight, ArrowLeft, TrendingUp, TrendingDown, Store } from "lucide-react";

export default function ProductDetailProtected({ product, slug }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [toastFired, setToastFired] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user && !toastFired) {
      setToastFired(true);
      toast.error("পণ্যের বিস্তারিত দেখতে অনুগ্রহ করে সাইন ইন করুন");
      router.push(`/signin?callbackUrl=/product/${encodeURIComponent(slug)}`);
    }
  }, [isPending, session, slug, router, toastFired]);

  // Price calculations
  const stats = useMemo(() => {
    if (!product) return null;

    const markets = product.markets || [];
    let minPrice = product.today;
    let maxPrice = product.today;
    let avgPrice = product.today;

    if (markets.length > 0) {
      const allMins = markets.map((m) => m.min).filter(Boolean);
      const allMaxs = markets.map((m) => m.max).filter(Boolean);
      if (allMins.length) minPrice = Math.min(...allMins);
      if (allMaxs.length) maxPrice = Math.max(...allMaxs);

      const allAvgs = markets.map((m) => (m.min + m.max) / 2);
      avgPrice = allAvgs.reduce((a, b) => a + b, 0) / allAvgs.length;
    }

    const priceDiff = Math.abs(product.today - (product.yesterday || product.today));
    let diffText = "গতকালের তুলনায় আজ কোনো পরিবর্তন নেই";
    if (product.today > (product.yesterday || product.today)) {
      diffText = `গতকালের তুলনায় আজ দাম বেড়েছে • ${toBengaliNumber(priceDiff)} টাকা`;
    } else if (product.today < (product.yesterday || product.today)) {
      diffText = `গতকালের তুলনায় আজ দাম কমেছে • ${toBengaliNumber(priceDiff)} টাকা`;
    }

    return {
      minPrice,
      maxPrice,
      avgPrice: Math.round(avgPrice * 10) / 10,
      diffText,
    };
  }, [product]);

  if (isPending) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 space-y-8 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6" />
        <div className="bg-white rounded-3xl p-8 border border-gray-100 h-48" />
        <div className="bg-white rounded-3xl p-8 border border-gray-100 h-36" />
        <div className="bg-white rounded-3xl p-8 border border-gray-100 h-72" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-amber-600">
          <Store className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">লগইন প্রয়োজন</h2>
        <p className="text-sm text-gray-500 mb-6">
          পণ্যের বাজারভিত্তিক বিবরণ দেখতে অ্যাকাউন্টে প্রবেশ করুন।
        </p>
        <Link
          href={`/signin?callbackUrl=/product/${encodeURIComponent(slug)}`}
          className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-[#0b7a49] hover:bg-[#08613a] rounded-xl shadow-sm transition-all"
        >
          লগইন পৃষ্ঠায় যান
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">পণ্য পাওয়া যায়নি</h2>
        <p className="text-sm text-gray-500 mb-6">অনুরোধকৃত পণ্যটির তথ্য পাওয়া যায়নি।</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#0b7a49] hover:bg-[#08613a] rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    );
  }

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const unitLabel = formatBengaliUnit(product.unit);
  const markets = product.markets || [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium">
        <Link href="/" className="hover:text-[#0b7a49] transition-colors">
          হোম
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link
          href={`/category/${product.category}`}
          className="hover:text-[#0b7a49] transition-colors"
        >
          {product.categoryNameBn || product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-gray-900 font-semibold truncate">{product.nameBn}</span>
      </nav>

      {/* Top Summary Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4 sm:gap-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-4xl sm:text-5xl shrink-0">
            {product.image || product.categoryIcon || "🍚"}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {product.nameBn}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
              {unitLabel} • {product.categoryNameBn || product.category}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mt-2 flex items-center gap-1.5">
              <span>{stats.diffText}</span>
            </p>
          </div>
        </div>

        {/* Right Price Highlight Box */}
        <div className="bg-[#f8faf8] border border-emerald-100/70 rounded-2xl p-5 min-w-[180px] text-center md:text-right flex flex-col items-center md:items-end justify-center self-stretch md:self-auto">
          <span className="text-xs text-gray-500 font-medium">আজকের দাম</span>
          <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 my-1">
            {toBengaliNumber(product.today)}
          </div>
          <span className="text-xs text-gray-500 font-medium mb-2">
            টাকা / {product.unit === "kg" ? "কেজি" : product.unit || "কেজি"}
          </span>
          <div>
            {isUp && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold bg-red-50 text-red-600 border border-red-100">
                <TrendingUp className="w-3.5 h-3.5" />
                ▲ {formatBengaliPercent(product.change?.pct)}
              </span>
            )}
            {isDown && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                <TrendingDown className="w-3.5 h-3.5" />
                ▼ {formatBengaliPercent(product.change?.pct)}
              </span>
            )}
            {!isUp && !isDown && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-600">
                — ০.০%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Price Summary Card (দামের সারসংক্ষেপ) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">
          দামের সারসংক্ষেপ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          {/* Min Price */}
          <div className="pt-4 sm:pt-0 sm:px-4 first:pl-0">
            <span className="text-xs font-medium text-gray-500 block">সর্বনিম্ন দাম</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0b7a49] my-1">
              {formatBengaliCurrency(stats.minPrice)}
            </div>
            <span className="text-xs text-gray-400">সবচেয়ে কম দামের বাজার</span>
          </div>

          {/* Max Price */}
          <div className="pt-4 sm:pt-0 sm:px-4">
            <span className="text-xs font-medium text-gray-500 block">সর্বাধিক দাম</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-red-600 my-1">
              {formatBengaliCurrency(stats.maxPrice)}
            </div>
            <span className="text-xs text-gray-400">সবচেয়ে বেশি দামের বাজার</span>
          </div>

          {/* Average Price */}
          <div className="pt-4 sm:pt-0 sm:px-4">
            <span className="text-xs font-medium text-gray-500 block">গড় দাম</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-gray-800 my-1">
              {formatBengaliCurrency(stats.avgPrice)}
            </div>
            <span className="text-xs text-gray-400">
              প্রতি {product.unit === "kg" ? "কেজি" : product.unit || "কেজি"}-এর হিসাবে
            </span>
          </div>
        </div>
      </div>

      {/* Market-by-Market Table (বাজারভিত্তিক আজকের দাম) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">
          বাজারভিত্তিক আজকের দাম
        </h2>

        {markets.length > 0 ? (
          <div className="overflow-x-auto -mx-6 sm:mx-0">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-semibold">
                  <th className="pb-3 px-4 font-semibold">বাজার</th>
                  <th className="pb-3 px-4 font-semibold">বিভাগ</th>
                  <th className="pb-3 px-4 font-semibold text-right sm:text-left">সর্বনিম্ন</th>
                  <th className="pb-3 px-4 font-semibold text-right sm:text-left">সর্বাধিক</th>
                  <th className="pb-3 px-4 font-semibold text-right sm:text-left">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {markets.map((m, idx) => {
                  const mAvg = (m.min + m.max) / 2;
                  const formattedAvg = mAvg % 1 === 0 ? mAvg : mAvg.toFixed(2);
                  return (
                    <tr
                      key={`${m.market}-${idx}`}
                      className="hover:bg-gray-50/70 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-semibold text-gray-900 whitespace-nowrap">
                        {m.market}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                        {m.division}
                      </td>
                      <td className="py-3.5 px-4 text-[#0b7a49] font-medium whitespace-nowrap text-right sm:text-left">
                        {formatBengaliCurrency(m.min)}
                      </td>
                      <td className="py-3.5 px-4 text-red-600 font-medium whitespace-nowrap text-right sm:text-left">
                        {formatBengaliCurrency(m.max)}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-gray-800 whitespace-nowrap text-right sm:text-left">
                        {toBengaliNumber(formattedAvg)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400 text-sm">
            এই পণ্যের জন্য আলাদা বাজার তালিকা পাওয়া যায়নি।
          </div>
        )}
      </div>
    </div>
  );
}
