// src/components/layout/Sidebar.tsx
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import hamburger from "../../assets/icons/hamburger.svg";
import { deleteMe } from "../../apis/userApi";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 외부 클릭 → 닫기
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

  const withdrawMutation = useMutation({
    mutationFn: async () => {
      await deleteMe();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      queryClient.removeQueries({ queryKey: ["me"] });
    },
    onSuccess: () => {
      alert("탈퇴가 완료되었습니다.");
      setWithdrawOpen(false);
      navigate("/login", { replace: true });
    },
    onError: (err: any) => {
      alert(`탈퇴 실패: ${err?.message ?? "오류"}`);
    },
  });

  return (
    <>
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

        {/* 사이드바 */}
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

            <button
              type="button"
              className="mt-4 text-left text-xs text-red-500 hover:underline"
              onClick={() => setWithdrawOpen(true)}
            >
              탈퇴하기
            </button>
          </nav>
        </aside>
      </div>

      {/* 탈퇴 확인 모달 */}
      {withdrawOpen && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40"
          onClick={() => setWithdrawOpen(false)}
        >
          <div
            className="bg-white rounded-md p-6 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-2">정말 탈퇴하시겠어요?</h2>
            <p className="text-sm text-gray-600 mb-4">
              탈퇴 시 계정 정보와 작성한 데이터가 삭제될 수 있습니다.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setWithdrawOpen(false)}
                className="px-4 py-2 rounded bg-gray-200 text-sm"
              >
                아니오
              </button>
              <button
                onClick={() => withdrawMutation.mutate()}
                disabled={withdrawMutation.isPending}
                className="px-4 py-2 rounded bg-red-500 text-white text-sm disabled:bg-gray-400"
              >
                {withdrawMutation.isPending ? "처리 중..." : "예, 탈퇴할게요"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
