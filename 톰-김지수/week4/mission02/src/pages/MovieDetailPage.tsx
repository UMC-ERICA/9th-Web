import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Spinner from "../components/Spinner"

// 🔑 TMDB v3 API 키
const TMDB_API_KEY = import.meta.env.VITE_TMDB_KEY as string | undefined

const API_BASE = "https://api.themoviedb.org/3"
const TMDB_LANG = "ko-KR"

// 타입 정의
interface MovieDetails {
  id: number
  title: string
  overview: string
  poster_path: string | null
  vote_average: number
  release_date: string
  genres: { id: number; name: string }[]
}

interface Credits {
  cast: { id: number; name: string; character: string; profile_path: string | null }[]
  crew: { id: number; name: string; job: string }[]
}

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>() // URL에서 movieId 추출
  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [credits, setCredits] = useState<Credits | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!movieId) return

    if (!TMDB_API_KEY) {
      setError("TMDB 키가 없습니다. .env에 VITE_TMDB_KEY를 추가하세요.")
      setIsLoading(false)
      return
    }

    const fetchMovieData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // 🎬 영화 상세 + 크레딧을 동시에 요청
        const [movieRes, creditsRes] = await Promise.all([
          axios.get(`${API_BASE}/movie/${movieId}`, {
            params: {
              api_key: TMDB_API_KEY, // 🔥 v3 인증
              language: TMDB_LANG,
            },
          }),
          axios.get(`${API_BASE}/movie/${movieId}/credits`, {
            params: {
              api_key: TMDB_API_KEY, // 🔥 v3 인증
              language: TMDB_LANG,
            },
          }),
        ])

        setMovie(movieRes.data)
        setCredits(creditsRes.data)
      } catch (e: any) {
        setError(e.message ?? "영화 정보를 불러오지 못했습니다.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovieData()
  }, [movieId])

  // 로딩 상태
  if (isLoading)
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner />
      </div>
    )

  // 에러 상태
  if (error)
    return (
      <div className="rounded-md border border-red-300 bg-red-50 p-4 text-red-700">
        에러 발생: {error}
      </div>
    )

  // 데이터 없을 때
  if (!movie) return <p>영화 정보를 찾을 수 없습니다.</p>

  const director = credits?.crew.find((c) => c.job === "Director")

  return (
    <section className="mx-auto max-w-3xl p-4">
      {/* 영화 기본 정보 */}
      <div className="flex flex-col gap-6 sm:flex-row">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={movie.title}
          className="w-full max-w-[300px] rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-500">{movie.release_date}</p>
          <p className="mt-2 text-yellow-600">⭐ {movie.vote_average.toFixed(1)}</p>
          <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-300">
            {movie.overview || "줄거리 정보가 없습니다."}
          </p>
          {director && (
            <p className="mt-4 text-sm text-gray-500">🎬 감독: {director.name}</p>
          )}
        </div>
      </div>

      {/* 출연진 섹션 */}
      <h2 className="mt-10 mb-4 text-2xl font-semibold">출연진</h2>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
        {credits?.cast.slice(0, 10).map((actor) => (
          <div key={actor.id} className="text-center text-sm">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                  : "https://via.placeholder.com/185x278?text=No+Image"
              }
              alt={actor.name}
              className="mx-auto mb-2 h-40 w-full rounded-lg object-cover"
            />
            <p className="font-medium">{actor.name}</p>
            <p className="text-xs text-gray-500">{actor.character}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
