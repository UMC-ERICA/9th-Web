// src/hooks/useDebounce.ts
import { useEffect, useState } from "react";

/**
 * 값이 일정 시간(delay) 동안 변하지 않을 때만 최종적으로 반영되는 디바운스 훅
 * 예: 검색어 입력 → 300ms 동안 추가 입력 없을 때만 서버 요청
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebounced(value);
    }, delay);

    // value 또는 delay가 바뀌면 이전 타이머 정리
    return () => {
      window.clearTimeout(timer);
    };
  }, [value, delay]);

  return debounced;
}
