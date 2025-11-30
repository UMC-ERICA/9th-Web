// src/hooks/useThrottle.ts
import { useEffect, useRef, useState } from "react";

/**
 * 값이 너무 자주 바뀔 때, 일정 주기(interval)마다 한 번만 변경되도록 하는 스로틀 훅
 * 예: 스크롤 위치 → 1초에 한 번만 처리
 */
export function useThrottle<T>(value: T, interval: number): T {
  const [throttled, setThrottled] = useState<T>(value);
  const lastExecutedRef = useRef<number>(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const now = Date.now();
    const remaining = interval - (now - lastExecutedRef.current);

    if (remaining <= 0) {
      // 바로 실행 가능한 경우
      lastExecutedRef.current = now;
      setThrottled(value);
    } else {
      // 남은 시간이 있으면 그만큼 기다렸다가 한 번만 실행
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        lastExecutedRef.current = Date.now();
        setThrottled(value);
      }, remaining);
    }

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [value, interval]);

  return throttled;
}
