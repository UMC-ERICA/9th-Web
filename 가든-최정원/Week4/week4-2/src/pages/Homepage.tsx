import Loginpage from "./Loginpage";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      {/* 홈 제목 */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        홈 화면입니다 🏠
      </h1>

      {/* 홈 설명 */}
      <p className="mb-8 text-gray-600">
        아래는 로그인 영역입니다.
      </p>

      {/* 로그인 컴포넌트 포함 */}
      <div className="border border-gray-300 rounded-lg shadow-md p-6 bg-white">
        <Loginpage />
      </div>
    </div>
  );
};

export default HomePage;
