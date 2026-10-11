"use client";

import Link from "next/link";
import Marquee from "react-fast-marquee";
import { formatBengaliPercent, toBengaliNumber } from "@/lib/api";

export default function PriceTicker({ products = [] }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="w-full bg-[#f8fafc] border-b border-gray-200/80 py-2.5 overflow-hidden select-none">
      <Marquee
        speed={45}
        pauseOnHover={true}
        autoFill={true}
        gradient={false}
      >
        {products.map((product) => {
          const isUp = product.change?.dir === "up";
          const isDown = product.change?.dir === "down";

          let unit = product.unit || "কেজি";
          if (unit.toLowerCase() === "kg") {
            unit = "কেজি";
          } else if (unit.toLowerCase() === "liter" || unit.toLowerCase() === "litre") {
            unit = "Litre";
          }

          return (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="inline-flex items-center gap-2 mx-3 sm:mx-4 hover:opacity-80 transition-opacity whitespace-nowrap text-xs sm:text-sm group"
            >
              <span className="text-base leading-none">
                {product.image || product.categoryIcon || "🍚"}
              </span>
              <span className="font-semibold text-gray-800 group-hover:text-[#0b7a49] transition-colors">
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
              <span className="text-gray-300 ml-3 select-none">|</span>
            </Link>
          );
        })}
      </Marquee>
    </div>
  );
}

