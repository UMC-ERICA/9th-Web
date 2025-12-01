import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";

interface UserData {
  id: number;
  name: string;
  email: string;
}

export default function MyPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api("/v1/users/me", { method: "GET", useAuth: true })
      .then((res) => setUser(res.data ?? res))
      .catch((err) => setError(err.message));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("token");
    alert("로그아웃 되었습니다.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">🔒 마이페이지</h1>
      {error && <p className="text-red-500">{error}</p>}
      {user ? (
        <div className="border rounded p-6 w-[320px] text-center">
          <p className="mb-2">안녕하세요,</p>
          <p className="text-xl font-semibold">{user.name}님 👋</p>
          <p className="text-sm text-gray-600 mt-1">{user.email}</p>
          <button onClick={handleLogout} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">
            로그아웃
          </button>
        </div>
      ) : (
        <p>유저 정보를 불러오는 중...</p>
      )}
    </div>
  );
}
