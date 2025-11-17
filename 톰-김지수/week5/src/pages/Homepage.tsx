import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("token");
    alert("로그아웃 되었습니다.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">홈 화면</h1>
      <p>UMC 회원가입/로그인 데모 🚀</p>

      <div className="flex gap-4">
        <button onClick={() => navigate("/login")} className="px-4 py-2 bg-blue-500 text-white rounded">로그인</button>
        <button onClick={() => navigate("/signup")} className="px-4 py-2 bg-green-600 text-white rounded">회원가입</button>
        <button onClick={() => navigate("/mypage")} className="px-4 py-2 bg-purple-600 text-white rounded">마이페이지</button>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded">로그아웃</button>
      </div>
    </div>
  );
}
