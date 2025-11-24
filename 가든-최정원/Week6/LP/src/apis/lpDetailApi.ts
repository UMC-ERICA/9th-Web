// src/apis/lpDetailApi.ts
import { api } from "../lib/api";
import type { Lp } from "./lpApi";

export async function getLpDetail(lpId: number): Promise<Lp> {
  const res = await api(`/v1/lps/${lpId}`, {
    method: "GET",
  });

  const root = res as any;
  const data = root.data ?? root;

  const lp: Lp = {
    id: data.id,
    title: data.title,
    content: data.content,
    thumbnail: data.thumbnail,
    createdAt: data.createdAt,
    tags: data.tags ?? [],
    likesCount: data.likesCount ?? data._count?.likes ?? 0,
    isLiked: data.isLiked ?? false,
    isMine: data.isMine ?? false,
  };

  return lp;
}
