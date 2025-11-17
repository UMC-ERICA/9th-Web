import { NavLink, Link } from "react-router-dom"

const tabs = [
  { to: "/", label: "홈", end: true },
  { to: "/popular", label: "인기 영화" },
  { to: "/now-playing", label: "상영 중" },
  { to: "/top-rated", label: "평점 높은" },
  { to: "/upcoming", label: "개봉 예정" },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200/60 bg-white/70 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
      <nav className="mx-auto max-w-5xl px-4 py-3 flex items-center flex-wrap gap-2">

        {/* 🔹 왼쪽 탭들 */}
        <div className="flex gap-2 flex-wrap">
          {tabs.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end as any}
              className={({ isActive }) =>
                [
                  "px-3 py-1.5 rounded-xl text-sm font-medium transition",
                  isActive
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800",
                ].join(" ")
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* 🔹 오른쪽으로 밀어내기 */}
        <div className="flex-1" />

        {/* 🔹 로그인 버튼 */}
        <Link
          to="/login"
          className="rounded-xl bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition"
        >
          로그인
        </Link>
      </nav>
    </header>
  )
}
