// src/lib/api.ts
import axios from "../lib/axios"; // ✅ 우리가 만든 axios 인스턴스 (src/lib/axios.ts)

export async function api(
  path: string,
  options: {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: unknown;
    headers?: Record<string, string>;
  } = {}
) {
  const { method = "GET", body, headers = {} } = options;

  // ✅ axios 요청 설정
  const config: any = {
    url: path,
    method,
    headers,
  };

  // body가 존재하고 GET이 아닐 때만 data로 추가
  if (body && method !== "GET") {
    config.data = body;
  }

  // ✅ 콘솔 디버깅 로그
  console.log("api.ts ▶️ 요청 URL:", `http://localhost:8000${path}`);
  if (body) console.log("api.ts 📦 요청 Body:", body);

  try {
    const res = await axios(config);
    return res.data; // axios는 data를 자동 파싱함
  } catch (error: any) {
    // ❗ 오류 핸들링
    console.error("❌ API 요청 실패:", error);
    throw error;
  }
}

export default api;
