// src/components/layout/Header.tsx
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe, type Me } from "../../apis/userApi";

export default function Header() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [hasToken, setHasToken] = useState<boolean>(() => {
    const token =
      localStorage.getItem("accessToken") ||
      localStorage.getItem("token");
    return !!token;
  });

  // 토큰 존재할 때만 me 조회
  const { data: me } = useQuery<Me>({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: hasToken,
  });

  // 토큰 변화 감지 (초기 한 번)
  useEffect(() => {
    const token =
      localStorage.getItem("accessToken") ||
      localStorage.getItem("token");
    setHasToken(!!token);
  }, []);

  const logoutMutation = useMutation({
    mutationFn: async () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["me"] });
      setHasToken(false);
      alert("로그아웃 되었습니다.");
      navigate("/login");
    },
  });

  const isLoggedIn = hasToken;
  const userName =
    me?.name ?? localStorage.getItem("userName") ?? "사용자";

  return (
    <header className="w-full flex items-center justify-between px-4 py-3 border-b bg-white">
      <Link to="/" className="text-xl font-bold">
        LP 프로젝트
      </Link>

      <div className="flex items-center gap-3 text-sm">
        {isLoggedIn ? (
          <>
            <span className="hidden sm:inline">
              {userName}님 반갑습니다 👋
            </span>
            <button
              onClick={() => navigate("/mypage")}
              className="px-3 py-1 rounded border"
            >
              마이페이지
            </button>
            <button
              onClick={() => logoutMutation.mutate()}
              className="px-3 py-1 rounded bg-red-500 text-white"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="px-3 py-1 rounded border"
            >
              로그인
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-3 py-1 rounded bg-blue-600 text-white"
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </header>
  );
}
