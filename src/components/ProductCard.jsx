import Link from "next/link";
import { formatBengaliCurrency, formatBengaliPercent, formatBengaliUnit } from "@/lib/api";

export default function ProductCard({ product }) {
  if (!product) return null;

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const unitText = formatBengaliUnit(product.unit);

  return (
    <Link
      href={`/product/${product.id}`}
      className="group bg-white rounded-2xl p-4 sm:p-5 border border-gray-100/90 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between"
    >
      <div className="flex items-start gap-3.5 mb-4">
        {/* Emoji / Icon Container */}
        <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 group-hover:bg-emerald-50/50 transition-transform">
          {product.image || product.categoryIcon || "🛒"}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-snug group-hover:text-[#0b7a49] transition-colors truncate">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5 font-medium">
            {unitText}
          </p>
        </div>
      </div>

      {/* Price row */}
      <div className="pt-3 border-t border-gray-100 flex items-end justify-between gap-2">
        <div>
          <span className="block text-[11px] text-gray-400 font-medium">
            আজকের দাম
          </span>
          <span className="text-lg sm:text-xl font-bold text-gray-900">
            {formatBengaliCurrency(product.today)}
          </span>
        </div>

        {/* Change Badge */}
        <div className="mb-0.5">
          {isUp && (
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-xs font-semibold bg-red-50 text-red-600 border border-red-100/60">
              ▲ +{formatBengaliPercent(product.change?.pct)}
            </span>
          )}
          {isDown && (
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100/60">
              ▼ -{formatBengaliPercent(product.change?.pct)}
            </span>
          )}
          {!isUp && !isDown && (
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-500">
              — ০.০%
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
