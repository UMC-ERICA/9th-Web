// src/components/comments/CommentCardSkeleton.tsx
export default function CommentCardSkeleton() {
  return (
    <div className="border-b py-3 animate-pulse">
      <div className="flex justify-between mb-2">
        <div className="h-3 bg-gray-200 rounded w-24" />
        <div className="h-3 bg-gray-200 rounded w-16" />
      </div>
      <div className="h-3 bg-gray-200 rounded w-full mb-1" />
      <div className="h-3 bg-gray-200 rounded w-5/6" />
    </div>
  );
}
