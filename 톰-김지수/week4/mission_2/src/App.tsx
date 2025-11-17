// src/App.tsx
import HeaderBar from "./components/HeaderBar";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PremiumWebtoonPage from "./pages/PremiumWebtoonPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <HeaderBar />
      <Routes>
        {/* 로그인 / 회원가입 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* 🔒 프리미엄 페이지 (Protected Route 적용) */}
        <Route
          path="/premium/webtoon/1"
          element={
            <ProtectedRoute>
              <PremiumWebtoonPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
