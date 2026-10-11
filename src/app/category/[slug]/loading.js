import ProductSkeleton from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-pulse">
      {/* Category Header Skeleton */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 flex items-center gap-5">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gray-200 shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="h-7 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-100 rounded w-1/3" />
        </div>
      </div>

      {/* Sort Row Skeleton */}
      <div className="flex items-center justify-between py-2 border-b border-gray-100">
        <div className="h-4 bg-gray-200 rounded w-28" />
        <div className="h-8 bg-gray-200 rounded w-36" />
      </div>

      {/* Cards Skeleton */}
      <ProductSkeleton count={6} />
    </div>
  );
}
