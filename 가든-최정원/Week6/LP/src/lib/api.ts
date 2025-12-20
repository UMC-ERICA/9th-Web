// src/lib/api.ts
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  withAuth?: boolean;
}

export async function api(path: string, options: ApiOptions = {}) {
  const {
    method = "GET",
    body,
    headers: customHeaders = {},
    withAuth = true,
  } = options;

  const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;

  const headers: Record<string, string> = { ...customHeaders };

  // FormData가 아닌 경우에만 JSON 헤더 설정
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (withAuth) {
    const token =
      localStorage.getItem("accessToken") || localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body
      ? (isFormData ? (body as BodyInit) : JSON.stringify(body))
      : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = data?.message || data?.error || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return data;
}
