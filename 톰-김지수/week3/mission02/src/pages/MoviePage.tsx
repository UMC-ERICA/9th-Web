import { useEffect, useState } from "react"
import axios from "axios"
import Spinner from "../components/Spinner"

type Props = { type: "popular" | "upcoming" | "top_rated" | "now_playing" }
type Movie = { id: number; title: string; poster_path: string | null; vote_average: number }

const API_BASE = import.meta.env.VITE_TMDB_BASE_URL ?? "https://api.themoviedb.org/3"
const TMDB_TOKEN = import.meta.env.VITE_TMDB_KEY as string | undefined
const TMDB_LANG = import.meta.env.VITE_TMDB_LANG ?? "ko-KR"

export default function MoviePage({ type }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    let ignore = false
    async function load() {
      setIsLoading(true)
      setError(null)

      // 환경변수 누락 방어
      if (!TMDB_TOKEN) {
        setError("TMDB 토큰이 없습니다. .env의 VITE_TMDB_TOKEN을 확인해주세요.")
        setIsLoading(false)
        return
      }

      try {
        const res = await axios.get(`${API_BASE}/movie/${type}`, {
          params: { language: TMDB_LANG, page: 1 },
          headers: { Authorization: `Bearer ${TMDB_TOKEN}` },
        })
        if (!ignore) setMovies(res.data?.results ?? [])
      } catch (e: any) {
        if (!ignore) setError(e?.message ?? "데이터를 불러오지 못했습니다.")
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }
    load()
    return () => { ignore = true }
  }, [type])

  if (isLoading) return <Spinner />
  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800/60 dark:bg-red-950/40 dark:text-red-300">
        오류가 발생했습니다: {error}
      </div>
    )
  }

  return (
    <section>
      <h1 className="mb-4 text-2xl font-semibold">
        {type === "popular" && "인기 영화"}
        {type === "upcoming" && "개봉 예정"}
        {type === "top_rated" && "평점 높은"}
        {type === "now_playing" && "상영 중"}
      </h1>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {movies.map((m) => (
          <li key={m.id} className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
            <div className="mb-2 aspect-[2/3] overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800" />
          </li>
        ))}
      </ul>
    </section>
  )
}
