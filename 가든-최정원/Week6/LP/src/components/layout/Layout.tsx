// src/components/layout/Layout.tsx
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import FloatingButton from "./FloatingButton";

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
