import { NavLink } from 'react-router-dom'

export default function Navbar(): JSX.Element {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-red-500 font-bold border-b-2 border-red-500 pb-1'
      : 'text-gray-400 hover:text-white transition-colors'

  return (
    <nav className="bg-black px-6 py-4 flex gap-6 justify-center">
      <NavLink to="/" end className={linkClass}>
        홈
      </NavLink>
      <NavLink to="/popular" className={linkClass}>
        인기 영화
      </NavLink>
      <NavLink to="/upcoming" className={linkClass}>
        개봉 예정
      </NavLink>
      <NavLink to="/top-rated" className={linkClass}>
        평점 높은
      </NavLink>
      <NavLink to="/now-playing" className={linkClass}>
        상영 중
      </NavLink>
    </nav>
  )
}
