// src/App.tsx
import HeaderBar from "./components/HeaderBar";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      {/* 모든 페이지 상단에 항상 보여줄 헤더 */}
      <HeaderBar />

      {/* URL에 따라 달라지는 화면 */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* 홈도 필요하면 추가 */}
        {/* <Route path="/" element={<HomePage />} /> */}
      </Routes>
    </>
  );
}

export default App;
