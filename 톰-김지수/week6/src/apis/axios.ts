import axios, { InternalAxiosRequestConfig, AxiosHeaders } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CustomInterfaceAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 전역 refresh Promise
let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  withCredentials: true,
});

// ✅ 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem();

    if (accessToken) {
      // 기존 헤더를 AxiosHeaders 객체로 변환
      const headers = AxiosHeaders.from(config.headers || {});
      headers.set("Authorization", `Bearer ${accessToken}`);
      config.headers = headers;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: CustomInterfaceAxiosRequestConfig = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      // refresh 엔드포인트에서 다시 401 뜨면 → 로그인 상태 종료
      if (originalRequest.url === "/v1/auth/refresh") {
        const { removeItem: removeAccessToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.accessToken
        );
        const { removeItem: removeRefreshToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.refreshToken
        );

        removeAccessToken();
        removeRefreshToken();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = (async () => {
          const { getItem: getRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );
          const refreshToken = getRefreshToken();

          const { data } = await axiosInstance.post("/v1/auth/refresh", {
            refresh: refreshToken,
          });

          const { setItem: setAccessToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.accessToken
          );
          const { setItem: setRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );

          setAccessToken(data.data.accessToken);
          setRefreshToken(data.data.refreshToken);

          return data.data.accessToken;
        })()
          .catch(() => {
            const { removeItem: removeAccessToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.accessToken
            );
            const { removeItem: removeRefreshToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.refreshToken
            );
            removeAccessToken();
            removeRefreshToken();
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      // 🔁 토큰 재발급 완료 후 원래 요청 재시도
      return refreshPromise.then((newAccessToken) => {
        const headers = AxiosHeaders.from(originalRequest.headers || {});
        headers.set("Authorization", `Bearer ${newAccessToken}`);
        originalRequest.headers = headers;

        return axiosInstance.request(originalRequest);
      });
    }

    return Promise.reject(error);
  }
);
