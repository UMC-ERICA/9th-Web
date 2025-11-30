// src/apis/lpApi.ts
import { api } from "../lib/api";

export interface Lp {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
  tags?: string[];
  likes?: any[]; // 서버 구조에 따라 배열일 수도 있음
  // 상세에서 쓸 수도 있는 필드들(있으면 사용, 없으면 기본값)
  likesCount?: number;
  likedByMe?: boolean;
}

export interface LpPage {
  items: Lp[];
  nextCursor: number | null;
  hasNext: boolean;
}

// 무한스크롤용 목록
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
    withAuth: false,
  });

  const root = res as any;
  const inner = root.data ?? {};
  const list = inner.data ?? [];

  return {
    items: list,
    nextCursor: inner.nextCursor ?? null,
    hasNext: inner.hasNext ?? false,
  };
}

// LP 생성 (파일 + 태그)
export async function createLp(input: {
  title: string;
  content: string;
  tags: string[];
  file?: File | null;
}) {
  const formData = new FormData();
  formData.append("title", input.title);
  formData.append("content", input.content);
  formData.append("tags", JSON.stringify(input.tags));

  if (input.file) {
    // 서버에서 기대하는 필드명에 맞게
    formData.append("thumbnail", input.file);
  }

  return api("/v1/lps", {
    method: "POST",
    body: formData,
  });
}

// LP 수정
export async function updateLp(lpId: number, data: {
  title: string;
  content: string;
  tags: string[];
}) {
  return api(`/v1/lps/${lpId}`, {
    method: "PATCH",
    body: data,
  });
}

// LP 삭제
export async function deleteLp(lpId: number) {
  return api(`/v1/lps/${lpId}`, {
    method: "DELETE",
  });
}

// 좋아요 토글용 API (true = 좋아요, false = 취소)
export async function toggleLpLike(lpId: number, like: boolean) {
  if (like) {
    // 좋아요
    return api(`/v1/lps/${lpId}/likes`, {
      method: "POST",
    });
  }
  // 좋아요 취소
  return api(`/v1/lps/${lpId}/likes`, {
    method: "DELETE",
  });
}
