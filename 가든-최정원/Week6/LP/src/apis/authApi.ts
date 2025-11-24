// src/apis/authApi.ts
import { api } from "../lib/api";

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  name?: string;
}

export async function loginApi(email: string, password: string) {
  const res = await api("/v1/auth/signin", {
    method: "POST",
    body: { email, password },
    withAuth: false,
  });

  const root = res as any;
  const data = root.data ?? root;
  return data as LoginResponse;
}

// 서버에 로그아웃 API가 없으면 클라이언트에서만 처리해도 됨
export async function logoutApi() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  return null;
}
