import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LpListPage from "./pages/LpsListPage";
import LpDetailPage from "./pages/LpDetailPage";
import UploadPage from "./pages/UploadPage";   // 🔵 업로드 페이지
import Mypage from "./pages/MyPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* layout 있는 페이지 */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />

          {/* 🔵 LP 목록 */}
          <Route path="/lps" element={<LpListPage />} />

          {/* 🔵 LP 상세 */}
          <Route path="/lps/:lpId" element={<LpDetailPage />} />

          {/* 🔵 LP 업로드 */}
          <Route path="/upload" element={<UploadPage />} />

          {/* My 페이지 */}
          <Route path="/mypage" element={<Mypage />} />
        </Route>

        {/* 인증 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
