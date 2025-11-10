// src/lib/axios.ts
import axios from "axios";

// ✅ Axios 인스턴스 생성
const instance = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

// ========================
// 🔐 토큰 관련 상태 변수
// ========================
let isRefreshing = false; // refresh 요청 중인지 여부
let refreshSubscribers: ((token: string) => void)[] = [];

// refresh 완료 후 대기중인 요청들에게 새 토큰 전달
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

// refresh 대기열 등록
const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

// ========================
// ✅ 요청 인터셉터: 모든 요청에 access token 추가
// ========================
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ========================
// ✅ 응답 인터셉터: 401 발생 시 refresh 로직 처리
// ========================
instance.interceptors.response.use(
  (response) => response, // 정상 응답은 그대로 반환
  async (error) => {
    const originalRequest = error.config;

    // 401 Unauthorized + 재시도 안 된 요청일 때만 수행
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // 무한루프 방지
      console.log("🔴 Access Token 만료 → refresh 요청 시작");

      // 이미 refresh 중이라면, 새 토큰 발급될 때까지 대기
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(instance(originalRequest)); // 새 토큰으로 재요청
          });
        });
      }

      // refresh 요청 시작
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token found");

        // ✅ Refresh Token으로 새 Access Token 요청
        const res = await axios.post(
          "http://localhost:8000/v1/auth/refresh",
          { refreshToken }
        );

        const newAccessToken = res.data?.data?.accessToken;
        if (!newAccessToken) throw new Error("No new access token in response");

        console.log("🟢 새 Access Token 발급됨:", newAccessToken);

        // 새 Access Token 저장
        localStorage.setItem("token", newAccessToken);

        // 대기중이던 요청들에게 새 토큰 전달
        onRefreshed(newAccessToken);
        isRefreshing = false;

        // 원래 요청을 새 토큰으로 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        console.error("🔴 토큰 갱신 실패:", refreshError);
        isRefreshing = false;

        // refresh 실패 → 로그인 만료 처리
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // 다른 에러는 그대로 반환
    return Promise.reject(error);
  }
);

export default instance;
