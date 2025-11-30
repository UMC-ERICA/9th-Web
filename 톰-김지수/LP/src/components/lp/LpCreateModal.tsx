// src/components/lp/LpCreateModal.tsx
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLp } from "../../apis/lpApi";
import Modal from "../common/Modal";

interface Props {
  onClose: () => void;
}

export default function LpCreateModal({ onClose }: Props) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const createMutation = useMutation({
    mutationFn: createLp,
    onSuccess: () => {
      alert("LP가 등록되었습니다!");
      queryClient.invalidateQueries({ queryKey: ["lps"] });
      onClose();
    },
    onError: (err: any) => {
      alert(`등록 실패: ${err.message ?? "알 수 없는 오류"}`);
    },
  });

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed) return;
    if (tags.includes(trimmed)) return;
    setTags((prev) => [...prev, trimmed]);
    setTagInput("");
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    createMutation.mutate({
      title,
      content,
      tags,
      file,
    });
  };

  return (
    <Modal onClose={onClose}>
      <div className="w-full max-w-lg bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add LP</h2>
          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="border rounded p-2 w-full"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="border rounded p-2 w-full min-h-[120px]"
            placeholder="내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div>
            <label className="block mb-1 text-sm font-medium">
              LP 사진 업로드
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                setFile(f);
              }}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">태그</label>
            <div className="flex gap-2 mb-2">
              <input
                className="border rounded p-2 flex-1"
                placeholder="태그 입력 후 +"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-2 bg-gray-800 text-white rounded"
              >
                추가
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 flex items-center gap-1"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-xs"
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={createMutation.isPending}
            className="mt-2 w-full py-2 rounded bg-blue-600 text-white disabled:bg-gray-400"
          >
            {createMutation.isPending ? "저장 중..." : "Add LP"}
          </button>
        </form>
      </div>
    </Modal>
  );
}
