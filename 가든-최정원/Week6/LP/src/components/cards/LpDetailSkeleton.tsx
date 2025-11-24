// src/components/cards/LpDetailSkeleton.tsx
export default function LpDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-7 bg-gray-200 rounded w-1/2 mb-3" />
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-6" />
      <div className="w-full h-64 bg-gray-200 rounded mb-6" />
      <div className="space-y-3">
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-11/12" />
        <div className="h-3 bg-gray-200 rounded w-10/12" />
      </div>
    </div>
  );
}
