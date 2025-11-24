// src/apis/commentApi.ts
import { api } from "../lib/api";

export interface Comment {
  id: number;
  content: string;
  authorId: number;          // ⭐ 반드시 필요
  authorName: string;
  isMine: boolean;
  createdAt: string;
}

export interface CommentPage {
  items: Comment[];
  nextCursor: number | null;
  hasNext: boolean;
}

export async function getCommentsPage(
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

  const root = res as any;
  const inner = root.data ?? {};
  const list = inner.data ?? [];

  const myId = Number(localStorage.getItem("userId"));

  const mapped = list.map((item: any) => ({
    id: item.id,
    content: item.content,
    authorId: item.authorId,
    authorName: item.author?.name ?? "알 수 없음",
    isMine: item.authorId === myId,
    createdAt: item.createdAt,
  }));

  return {
    items: mapped,
    nextCursor: inner.nextCursor ?? null,
    hasNext: inner.hasNext ?? false,
  };
}

export async function createComment(lpId: number, content: string) {
  return api(`/v1/lps/${lpId}/comments`, {
    method: "POST",
    body: { content },
  });
}

export async function updateComment(
  lpId: number,
  commentId: number,
  content: string
) {
  return api(`/v1/lps/${lpId}/comments/${commentId}`, {
    method: "PATCH",
    body: { content },
  });
}

export async function deleteComment(lpId: number, commentId: number) {
  return api(`/v1/lps/${lpId}/comments/${commentId}`, {
    method: "DELETE",
  });
}
