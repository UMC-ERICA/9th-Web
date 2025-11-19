// src/lib/api.ts
import axios from "../apis/axios";

export async function api(
  path: string,
  options: {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: unknown;
    headers?: Record<string, string>;
  } = {}
) {
  const { method = "GET", body, headers = {} } = options;

  const config: any = {
    url: path,
    method,
    headers,
  };

  if (body && method !== "GET") {
    config.data = body;
  }

  console.log("api.ts ▶️ 요청 URL:", `http://localhost:8000${path}`);
  if (body) console.log("api.ts 📦 요청 Body:", body);

  try {
    const res = await axios(config);
    return res.data;
  } catch (error: any) {
    console.error("❌ API 요청 실패:", error);
    throw error;
  }
}

// ⬇⬇⬇ 이게 중요!!! ⬇⬇⬇
export default api;
