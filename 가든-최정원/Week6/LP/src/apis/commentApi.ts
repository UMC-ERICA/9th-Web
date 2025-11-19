// src/apis/commentApi.ts
import api from "../lib/api";

export interface CommentAuthor {
  id: number;
  name: string;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  author: CommentAuthor;
}

export interface CommentPage {
  items: Comment[];
  nextCursor: number | null;
  hasNext: boolean;
}

export async function getComments(
  lpId: number,
  order: "latest" | "oldest",
  cursor?: number
): Promise<CommentPage> {
  const params = new URLSearchParams();
  params.set("order", order);
  if (cursor !== undefined && cursor !== null) {
    params.set("cursor", String(cursor));
  }

  const res = await api(`/v1/lps/${lpId}/comments?${params.toString()}`, {
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
