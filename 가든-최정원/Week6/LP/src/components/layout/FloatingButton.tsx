// src/components/layout/FloatingButton.tsx
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLp } from "../../apis/lpApi";

export default function FloatingButton() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState(""); // URL 기반
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: () =>
      createLp({
        title,
        content,
        thumbnail,
        tags,
        published: true,
      }),
    onSuccess: () => {
      alert("LP가 등록되었습니다.");

      // 모달 초기화
      setOpen(false);
      setTitle("");
      setContent("");
      setThumbnail("");
      setTagInput("");
      setTags([]);

      // 목록 새로고침
      queryClient.invalidateQueries({ queryKey: ["lps"] });
    },
    onError: (err: any) => {
      alert(`LP 등록 실패: ${err.message}`);
    },
  });

  const handleAddTag = () => {
    const t = tagInput.trim();
    if (!t) return;
    if (tags.includes(t)) return;

    setTags((prev) => [...prev, t]);
    setTagInput("");
  };

  const handleRemoveTag = (tag: string) =>
    setTags((prev) => prev.filter((x) => x !== tag));

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    createMutation.mutate();
  };

  return (
    <>
      {/* + 플로팅 버튼 */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-blue-600 text-white text-3xl flex items-center justify-center shadow-lg"
      >
        +
      </button>

      {/* 모달 */}
      {open && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-md p-6 w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">LP 작성하기</h2>
              <button onClick={() => setOpen(false)}>X</button>
            </div>

            <div className="space-y-3 text-sm">
              {/* 제목 */}
              <div>
                <label className="block mb-1 font-medium">Title</label>
                <input
                  className="w-full border rounded px-2 py-1"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* 내용 */}
              <div>
                <label className="block mb-1 font-medium">Content</label>
                <textarea
                  className="w-full border rounded px-2 py-1 min-h-[120px]"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              {/* Thumbnail URL */}
              <div>
                <label className="block mb-1 font-medium">Thumbnail URL</label>
                <input
                  className="w-full border rounded px-2 py-1"
                  value={thumbnail}
                  placeholder="이미지 주소(URL)를 입력하세요"
                  onChange={(e) => setThumbnail(e.target.value)}
                />
              </div>

              {/* 태그 */}
              <div>
                <label className="block mb-1 font-medium">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    className="flex-1 border rounded px-2 py-1"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="태그 입력 후 Add"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3 py-1 rounded bg-gray-200 text-sm"
                  >
                    Add
                  </button>
                </div>

                {/* 태그 목록 */}
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-xs"
                    >
                      #{tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="text-gray-500"
                      >
                        x
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded bg-gray-200 text-sm"
                >
                  취소
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={createMutation.isLoading}
                  className="px-4 py-2 rounded bg-blue-600 text-white text-sm disabled:bg-gray-400"
                >
                  {createMutation.isLoading ? "등록 중..." : "등록하기"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
