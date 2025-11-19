// src/apis/lpDetailApi.ts
import api from "../lib/api";
import type { Lp } from "./lpApi";

export interface LpDetail extends Lp {
  likesCount?: number;
}

export async function getLpDetail(lpId: number): Promise<LpDetail> {
  const res = await api(`/v1/lps/${lpId}`, { method: "GET" });

  const root = res;
  const lp = (root.data ?? root) as any;

  const likesCount =
    (lp.likes && Array.isArray(lp.likes) && lp.likes.length) ||
    lp.likesCount ||
    0;

  return { ...lp, likesCount };
}
