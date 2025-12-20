import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [stored, setStored] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(stored));
    } catch {
      // ignore
    }
  }, [key, stored]);

  const update = useCallback((updater: T | ((prev: T) => T)) => {
    setStored((prev) => (typeof updater === "function" ? (updater as any)(prev) : updater));
  }, []);

  return [stored, update] as const;
}
