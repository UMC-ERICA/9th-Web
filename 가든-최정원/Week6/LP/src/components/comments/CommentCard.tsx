// src/components/comments/CommentCard.tsx
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateComment,
  deleteComment,
  type Comment,
} from "../../apis/commentApi";

interface Props {
  comment: Comment;
  lpId: number;
  order: "latest" | "oldest";
}

export default function CommentCard({ comment, lpId, order }: Props) {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(comment.content);

  const updateMutation = useMutation({
    mutationFn: (newContent: string) =>
      updateComment(lpId, comment.id, newContent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpId, order] });
      setEditing(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteComment(lpId, comment.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpId, order] });
    },
  });

  return (
    <div className="border-b py-3 text-sm">
      {/* 이름, 시간 */}
      <div className="flex justify-between mb-1">
        <span className="font-semibold">{comment.authorName}</span>
        <span className="text-xs text-gray-400">
          {new Date(comment.createdAt).toLocaleString()}
        </span>
      </div>

      {/* 수정 중 */}
      {editing ? (
        <div className="space-y-2">
          <textarea
            className="w-full border rounded p-2 text-sm"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setEditing(false)}
              className="px-2 py-1 text-xs rounded bg-gray-200"
            >
              취소
            </button>
            <button
              onClick={() => updateMutation.mutate(value)}
              className="px-2 py-1 text-xs rounded bg-blue-600 text-white"
            >
              저장
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-800 whitespace-pre-wrap">{comment.content}</p>
      )}

      {/* 수정/삭제 버튼 */}
      {comment.isMine && !editing && (
        <div className="mt-2 flex gap-3 text-xs justify-end text-gray-500">
          <button onClick={() => setEditing(true)}>수정</button>
          <button
            onClick={() => {
              if (confirm("댓글을 삭제할까요?")) {
                deleteMutation.mutate();
              }
            }}
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
