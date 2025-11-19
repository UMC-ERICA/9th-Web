// src/components/common/ErrorState.tsx
interface Props {
  onRetry?: () => void;
}

export default function ErrorState({ onRetry }: Props) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-10 gap-3">
      <p className="text-red-500 text-sm">데이터를 불러오는 중 오류가 발생했습니다.</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-1.5 rounded bg-gray-800 text-white text-sm"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}
