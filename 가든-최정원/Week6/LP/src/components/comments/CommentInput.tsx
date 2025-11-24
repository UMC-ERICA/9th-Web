// src/components/comments/CommentInput.tsx
import { useState } from "react";

interface Props {
  onSubmit: (value: string) => void;
  isLoading: boolean;
}

export default function CommentInput({ onSubmit, isLoading }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    onSubmit(trimmed);
    setValue("");
  };

  return (
    <div className="mt-3 border rounded p-3 text-sm bg-white">
      <textarea
        className="w-full border rounded p-2 text-sm min-h-[60px] mb-2"
        placeholder="댓글을 입력해보세요."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="px-4 py-1 rounded bg-blue-600 text-white text-xs disabled:bg-gray-400"
        >
          {isLoading ? "작성 중..." : "댓글 작성"}
        </button>
      </div>
    </div>
  );
}
