// src/components/comments/CommentInput.tsx
import { useState } from "react";

export default function CommentInput() {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    alert("댓글 작성 API는 아직 미구현 상태입니다. (UI만 구현)");
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded p-3 space-y-2">
      <textarea
        className="w-full border rounded p-2 text-sm resize-none h-20 focus:outline-none focus:ring-1 focus:ring-blue-400"
        placeholder="댓글을 입력해주세요. (엔터만 눌러도 안 올라가고, 버튼으로 전송된다고 가정)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-1.5 rounded bg-blue-600 text-white text-sm disabled:bg-gray-400"
          disabled={!value.trim()}
        >
          댓글 작성
        </button>
      </div>
      <p className="text-xs text-gray-400">
        ※ 과제 요구사항에 따라 UI만 구현된 상태입니다.
      </p>
    </form>
  );
}
