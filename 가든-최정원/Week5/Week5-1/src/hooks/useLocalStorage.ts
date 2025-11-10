import { useCallback } from "react";

export function useLocalStorage(key: string) {
  const setItem = useCallback((value: string) => {
    localStorage.setItem(key, value);
  }, [key]);

  const getItem = useCallback(() => {
    return localStorage.getItem(key);
  }, [key]);

  const removeItem = useCallback(() => {
    localStorage.removeItem(key);
  }, [key]);

  return { setItem, getItem, removeItem };
}
