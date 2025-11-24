// src/routes/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token =
    localStorage.getItem("accessToken") ||
    localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    alert("로그인이 필요한 페이지입니다.");
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }
  return <>{children}</>;
}
