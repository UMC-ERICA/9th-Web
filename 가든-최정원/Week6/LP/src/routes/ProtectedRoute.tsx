// src/routes/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const token =
    localStorage.getItem("accessToken") ||
    localStorage.getItem("token");

  if (!token) {
    if (!window.confirm("로그인이 필요한 페이지입니다. 로그인 하시겠습니까?")) {
      return <Navigate to="/" replace />;
    }

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
