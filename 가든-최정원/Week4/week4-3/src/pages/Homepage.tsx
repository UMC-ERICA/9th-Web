import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-6">
      <h1 className="text-3xl font-bold text-gray-800">홈 화면</h1>
      <p className="text-gray-600">UMC 회원가입 데모입니다 🚀</p>

      <div className="flex gap-4">
        {/* 로그인 페이지 이동 */}
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          로그인
        </button>

        {/* 회원가입 페이지 이동 */}
        <button
          onClick={() => navigate("/signup")}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default HomePage;
