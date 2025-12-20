// src/components/cards/LpDetailSkeleton.tsx
export default function LpDetailSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 w-2/3 bg-gray-200 rounded" />
      <div className="h-4 w-1/3 bg-gray-200 rounded" />
      <div className="h-64 bg-gray-200 rounded" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
    </div>
  );
}
