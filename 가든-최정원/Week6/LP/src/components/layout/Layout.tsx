// src/components/layout/Layout.tsx
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import FloatingButton from "./FloatingButton";

/**
 * 메인 레이아웃: 헤더 + 사이드바 + 메인 컨텐츠 + 플로팅 버튼
 */
export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
      <FloatingButton />
    </div>
  );
}
