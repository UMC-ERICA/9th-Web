import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token =
    localStorage.getItem("accessToken") ||
    localStorage.getItem("token"); // 서버가 어떤 키로 내려줘도 대응

  if (!token) {
    alert("로그인이 필요한 페이지입니다.");
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
