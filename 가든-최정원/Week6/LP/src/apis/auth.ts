// src/apis/auth.ts
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  withCredentials: true,
});

// 요청 인터셉터 (토큰 자동 포함)
instance.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("accessToken") || localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 응답 인터셉터 (401 → 토큰 만료 시 처리)
instance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      console.error("❌ 401 Unauthorized — 토큰 만료 가능성");
    }
    return Promise.reject(error);
  }
);

export default instance;
