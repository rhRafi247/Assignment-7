export default function ProductLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="h-4 bg-gray-200 rounded w-1/4" />

      {/* Top Card Skeleton */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-gray-200 shrink-0" />
          <div className="space-y-2">
            <div className="h-7 bg-gray-200 rounded w-44" />
            <div className="h-4 bg-gray-100 rounded w-28" />
            <div className="h-4 bg-gray-100 rounded w-40" />
          </div>
        </div>
        <div className="w-40 h-28 bg-gray-100 rounded-2xl" />
      </div>

      {/* Summary Skeleton */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm h-36" />

      {/* Table Skeleton */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm h-72" />
    </div>
  );
}
