// src/components/common/ErrorState.tsx
interface Props {
  onRetry: () => void;
}

export default function ErrorState({ onRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-sm text-gray-600">
      <p className="mb-3">데이터를 불러오는 중 오류가 발생했습니다.</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 rounded bg-blue-600 text-white"
      >
        다시 시도
      </button>
    </div>
  );
}
