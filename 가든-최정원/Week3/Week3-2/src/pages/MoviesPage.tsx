import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import MovieCard from '../components/MovieCard'
import type { Movie } from '../types/movie'

export default function MoviesPage(): JSX.Element {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1) // ✅ 페이지 상태 추가
  const location = useLocation()

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // ✅ 현재 라우트에 따라 카테고리 구분
        let category = 'popular'
        if (location.pathname.includes('upcoming')) category = 'upcoming'
        else if (location.pathname.includes('top-rated')) category = 'top_rated'
        else if (location.pathname.includes('now-playing')) category = 'now_playing'

        // ✅ TMDB API 호출 (페이지 번호 포함)
        const { data } = await axios(
          `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              accept: 'application/json',
            },
          }
        )
        setMovies(data.results)
      } catch (err) {
        setError('영화 데이터를 불러오지 못했습니다 😢')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovies()
  }, [location.pathname, page]) // ✅ 페이지 번호가 바뀔 때마다 다시 fetch

  // ✅ 로딩 및 에러 상태 표시
  if (isLoading) return <div className="text-center mt-10">⏳ 로딩 중...</div>
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>

  return (
    <div className="p-10">
      <div
        className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
        lg:grid-cols-5 xl:grid-cols-6"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* ✅ 페이지네이션 버튼 */}
      <div className="flex justify-center items-center gap-6 mt-10">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg font-semibold ${
            page === 1
              ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          이전
        </button>

        <span className="text-lg font-bold text-white">
          페이지 {page}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 rounded-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white"
        >
          다음
        </button>
      </div>
    </div>
  )
}
