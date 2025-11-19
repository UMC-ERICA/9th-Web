// src/components/layout/Header.tsx
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem("accessToken") || localStorage.getItem("token");
    const name = localStorage.getItem("userName");
    setIsLoggedIn(!!token);
    setUserName(name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userName");
    alert("로그아웃 되었습니다.");
    setIsLoggedIn(false);
    setUserName(null);
    navigate("/login");
  };

  return (
    <header className="w-full flex items-center justify-between px-4 py-3 border-b bg-white">
      <Link to="/" className="text-xl font-bold">
        LP 프로젝트
      </Link>

      <div className="flex items-center gap-3 text-sm">
        {isLoggedIn ? (
          <>
            <span className="hidden sm:inline">
              {userName ?? "사용자"}님 반갑습니다 👋
            </span>
            <button
              onClick={() => navigate("/mypage")}
              className="px-3 py-1 rounded border"
            >
              마이페이지
            </button>
            <button
              onClick={handleLogout}
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
