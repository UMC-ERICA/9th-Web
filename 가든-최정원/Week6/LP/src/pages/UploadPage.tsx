// src/pages/UploadPage.tsx
export default function UploadPage() {
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">LP 업로드</h1>
      <p className="text-sm text-gray-500 mb-4">
        이 페이지는 과제 범위에서 UI만 간단히 구성해두었습니다.
      </p>
      <form className="space-y-3">
        <input
          className="w-full border rounded p-2 text-sm"
          placeholder="제목"
        />
        <input
          className="w-full border rounded p-2 text-sm"
          placeholder="썸네일 URL"
        />
        <textarea
          className="w-full border rounded p-2 text-sm h-40 resize-none"
          placeholder="내용을 입력하세요"
        />
        <button
          type="button"
          onClick={() => alert("업로드 API는 미구현 상태입니다.")}
          className="px-4 py-2 rounded bg-blue-600 text-white text-sm"
        >
          업로드 (UI만 구현)
        </button>
      </form>
    </div>
  );
}
