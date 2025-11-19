// src/apis/lpApi.ts
import api from "../lib/api";

export interface Lp {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
  likes?: unknown[];
}

export interface LpPage {
  items: Lp[];
  nextCursor: number | null;
  hasNext: boolean;
}

export async function getLpsPage(
  sort: "latest" | "oldest",
  cursor?: number
): Promise<LpPage> {
  const params = new URLSearchParams();
  params.set("sort", sort);
  if (cursor !== undefined && cursor !== null) {
    params.set("cursor", String(cursor));
  }

  const res = await api(`/v1/lps?${params.toString()}`, {
    method: "GET",
  });

  const root = res;
  const inner = root.data ?? {};
  const list = inner.data ?? [];

  return {
    items: list,
    nextCursor: inner.nextCursor ?? null,
    hasNext: inner.hasNext ?? false,
  };
}
