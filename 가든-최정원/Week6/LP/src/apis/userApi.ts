// src/apis/userApi.ts
import { api } from "../lib/api";

export interface Me {
  id: number;
  name: string;
  email: string;
  bio?: string | null;
  profileImageUrl?: string | null;
}

// 내 정보 조회: /v1/users/me
export async function getMe(): Promise<Me> {
  const res = await api("/v1/users/me", { method: "GET" });
  const data = (res as any).data ?? res;
  return data as Me;
}

// 내 정보 수정: /v1/users  (PATCH)
export async function updateMe(input: {
  name?: string;
  bio?: string;
  profileImageUrl?: string;
}) {
  return api("/v1/users", {
    method: "PATCH",
    body: input,
  });
}

// 탈퇴: /v1/users  (DELETE)
export async function deleteMe() {
  return api("/v1/users", {
    method: "DELETE",
  });
}
