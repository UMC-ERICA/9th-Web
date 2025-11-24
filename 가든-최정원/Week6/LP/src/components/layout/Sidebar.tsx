// src/components/layout/Sidebar.tsx
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import hamburger from "../../assets/icons/hamburger.svg";

/**
 * Vite에서 SVG 사용하는 방법 정리:
 * 1) /src/assets/... 에 SVG 파일을 두고
 *    import icon from "./icon.svg";
 *    <img src={icon} /> 형태로 사용
 * 2) 지금은 img src 방식 사용
 */

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div className="relative">
      {/* 버거 버튼 (모바일) */}
      <button
        className="md:hidden p-2 m-2"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
      >
        <img src={hamburger} alt="menu" className="w-7 h-7" />
      </button>

      <aside
        ref={ref}
        className={`
          fixed md:static top-0 left-0 z-30
          w-64 h-full bg-white border-r shadow-md
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <nav className="p-6 flex flex-col gap-4 text-sm">
          <Link to="/lps" className="hover:underline">
            LP 목록
          </Link>
          <Link to="/upload" className="hover:underline">
            업로드
          </Link>
          <Link to="/mypage" className="hover:underline">
            마이페이지
          </Link>
        </nav>
      </aside>
    </div>
  );
}
