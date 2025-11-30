// src/components/cards/LpCardSkeleton.tsx
export default function LpCardSkeleton() {
  return (
    <div className="animate-pulse rounded overflow-hidden shadow bg-white">
      <div className="h-40 bg-gray-200" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
}
