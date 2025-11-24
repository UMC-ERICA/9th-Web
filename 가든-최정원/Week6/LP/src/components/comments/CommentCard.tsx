// src/components/comments/CommentCard.tsx
import type { Comment } from "../../apis/commentApi";

interface Props {
  comment: Comment;
}

export default function CommentCard({ comment }: Props) {
  const created = new Date(comment.createdAt).toLocaleString("ko-KR");

  return (
    <div className="border-b py-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="font-semibold">{comment.author.name}</span>
        <span className="text-gray-400 text-xs">{created}</span>
      </div>
      <p className="text-sm text-gray-800 whitespace-pre-wrap">
        {comment.content}
      </p>
    </div>
  );
}
