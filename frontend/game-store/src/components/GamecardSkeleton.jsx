function GamecardSkeleton() {
  return (
    <div className="relative w-64 rounded-xl overflow-hidden shadow-lg bg-[#0e1220] text-white animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-72 bg-gray-700" />

      {/* Hover Icons Placeholder (bottom-right) */}
      <div className="absolute bottom-2 right-2 flex space-x-2">
        <div className="w-8 h-8 bg-gray-600 rounded-full" />
        <div className="w-8 h-8 bg-gray-600 rounded-full" />
      </div>

      {/* Text Skeleton */}
      <div className="p-3">
        <div className="h-4 bg-gray-600 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-600 rounded w-1/4" />
      </div>
    </div>
  );
}

export default GamecardSkeleton;
