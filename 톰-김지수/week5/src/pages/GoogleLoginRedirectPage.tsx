import { useEffect } from "react";
import { LOCAL_STORAGE_KEY } from "../constants/key";

export default function GoogleLoginRedirectPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get(LOCAL_STORAGE_KEY.accessToken);
    const refreshToken = params.get(LOCAL_STORAGE_KEY.refreshToken);

    if (accessToken && refreshToken) {
      localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, accessToken);
      localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, refreshToken);
      alert("✅ 구글 로그인 성공!");
      window.location.href = "/mypage";
    } else {
      alert("❌ 구글 로그인에 실패했습니다. 다시 시도해주세요.");
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen text-lg">
      구글 로그인 리다이렉트 처리 중입니다...
    </div>
  );
}
