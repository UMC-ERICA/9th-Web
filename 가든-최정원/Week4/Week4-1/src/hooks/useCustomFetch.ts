// src/hooks/useCustomFetch.ts
import { useEffect, useState } from "react";

export function useCustomFetch<T>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(url, options);
        if (!res.ok) throw new Error("데이터를 불러오지 못했습니다 😢");

        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
