// src/apis/lpApi.ts
import { api } from "../lib/api";

export interface Lp {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
  tags?: string[];
  likes?: any[];
  // 백엔드에서 내려주면 사용, 없으면 undefined
  isMine?: boolean;
  likeCount?: number;
  isLiked?: boolean;
}

export interface LpPage {
  items: Lp[];
  nextCursor: number | null;
  hasNext: boolean;
}

// 무한스크롤 + 검색용 LP 목록
export async function getLpsPage(
  sort: "latest" | "oldest",
  cursor?: number,
  search?: string
): Promise<LpPage> {
  const params = new URLSearchParams();
  params.set("sort", sort);

  if (cursor !== undefined && cursor !== null) {
    params.set("cursor", String(cursor));
  }

  const trimmed = search?.trim();
  if (trimmed) {
    // 백엔드에서 어떤 이름을 쓰든, 보통 search/query/keyword 중 하나인데
    // 여기서는 search 라는 쿼리 파라미터로 보냄.
    params.set("search", trimmed);
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

// LP 생성 (이미 구현되어 있던 형태 유지)
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

// 좋아요 토글 (이미 구현돼 있다면 이 형태와 크게 다르지 않을 것)
export async function toggleLpLike(lpId: number) {
  // 서버가 같은 URL로 "좋아요" / "좋아요 취소" 모두 처리한다고 했으니
  // 프론트는 단순 POST 한 번만 날리면 됨.
  return api(`/v1/lps/${lpId}/likes`, {
    method: "POST",
  });
}
