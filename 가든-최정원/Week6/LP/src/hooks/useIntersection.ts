// src/hooks/useIntersection.ts
import { useEffect, useRef } from "react";

export function useIntersection(onIntersect: () => void) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) onIntersect();
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref.current]);

  return ref;
}
