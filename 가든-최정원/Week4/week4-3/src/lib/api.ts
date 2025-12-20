// src/lib/api.ts
type ApiOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;               // 넘겨준 객체를 그대로 JSON으로 보냄
  headers?: Record<string, string>;
  baseUrl?: string;
};

const DEFAULT_BASE_URL = "http://localhost:8000";

export async function api(path: string, options: ApiOptions = {}) {
  const {
    method = "GET",
    body,
    headers = {},
    baseUrl = DEFAULT_BASE_URL,
  } = options;

  const url = `${baseUrl}${path}`;

  // ✅ body를 임의로 가공하지 말고 그대로 직렬화
  const hasBody = body !== undefined && body !== null && method !== "GET";

  const reqInit: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(hasBody ? { body: JSON.stringify(body) } : {}),
  };

  // 디버깅 로그 (보낼 그대로 보여줌)
  console.log("api.ts ▶️ 요청 URL:", url);
  if (hasBody) console.log("api.ts 📦 요청 Body:", body);

  const res = await fetch(url, reqInit);

  // JSON 시도 파싱 (빈 응답 대비)
  let data: any = null;
  const text = await res.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const msg =
      (data && (data.message || data.error)) ||
      `HTTP ${res.status} ${res.statusText}`;
    throw new Error(msg);
  }
  return data;
}
export default api;
