export default function ProductSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm animate-pulse flex flex-col justify-between h-44"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gray-200 shrink-0" />
            <div className="flex-1 space-y-2 pt-1">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-100 rounded w-1/3" />
            </div>
          </div>
          <div className="pt-3 border-t border-gray-100 flex items-end justify-between">
            <div className="space-y-1">
              <div className="h-2.5 bg-gray-100 rounded w-12" />
              <div className="h-5 bg-gray-200 rounded w-20" />
            </div>
            <div className="h-5 bg-gray-200 rounded w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}
