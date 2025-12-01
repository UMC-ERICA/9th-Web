// src/components/comments/CommentCardSkeleton.tsx
export default function CommentCardSkeleton() {
  return (
    <div className="animate-pulse border-b py-3">
      <div className="flex justify-between mb-2">
        <div className="h-3 w-20 bg-gray-200 rounded" />
        <div className="h-3 w-28 bg-gray-200 rounded" />
      </div>
      <div className="h-4 bg-gray-200 rounded mb-1" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
    </div>
  );
}
