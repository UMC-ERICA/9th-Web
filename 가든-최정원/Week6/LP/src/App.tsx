// src/App.tsx
import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import HomePage from "./pages/Homepage";
import LpsListPage from "./pages/LpsListPage";
import LpDetailPage from "./pages/LpDetailPage";
import UploadPage from "./pages/UploadPage";

import Loginpage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";
import NotFoundPage from "./pages/NotFoundPage";

import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* 헤더/사이드바/플로팅 버튼이 있는 공통 레이아웃 */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/lps" element={<LpsListPage />} />
        <Route
          path="/lp/:lpId"
          element={
            <ProtectedRoute>
              <LpDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* 인증 관련 페이지 (레이아웃 바깥) */}
      <Route path="/login" element={<Loginpage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/google" element={<GoogleLoginRedirectPage />} />
      <Route
        path="/mypage"
        element={
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
