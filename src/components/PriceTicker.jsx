"use client";

import Link from "next/link";
import { formatBengaliCurrency, formatBengaliPercent, toBengaliNumber } from "@/lib/api";

export default function PriceTicker({ products = [] }) {
  if (!products || products.length === 0) return null;

  // Duplicate items to ensure seamless infinite looping marquee
  const tickerItems = [...products, ...products];

  return (
    <div className="w-full bg-[#f8fafc] border-b border-gray-200 overflow-hidden py-2 select-none">
      <div className="flex animate-marquee items-center gap-8 text-xs sm:text-sm">
        {tickerItems.map((product, idx) => {
          const isUp = product.change?.dir === "up";
          const isDown = product.change?.dir === "down";
          const unit = product.unit === "kg" ? "কেজি" : product.unit || "কেজি";

          return (
            <Link
              key={`${product.id}-${idx}`}
              href={`/product/${product.id}`}
              className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity whitespace-nowrap px-1 group"
            >
              <span className="text-base">{product.image || product.categoryIcon || "🍚"}</span>
              <span className="font-medium text-gray-800 group-hover:text-[#0b7a49]">
                {product.nameBn}
              </span>
              <span className="text-gray-600 font-medium">
                {toBengaliNumber(product.today)} টাকা/{unit}
              </span>
              {isUp && (
                <span className="text-red-600 font-semibold flex items-center gap-0.5">
                  ▲ {formatBengaliPercent(product.change?.pct)}
                </span>
              )}
              {isDown && (
                <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                  ▼ {formatBengaliPercent(product.change?.pct)}
                </span>
              )}
              {!isUp && !isDown && (
                <span className="text-gray-400 font-semibold flex items-center gap-0.5">
                  — ০.০%
                </span>
              )}
              <span className="text-gray-300 ml-2">|</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
