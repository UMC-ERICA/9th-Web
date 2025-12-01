// src/pages/MoviePage.tsx
import { MovieCard } from "../components/MovieCard";
import { useEffect, useState } from "react";
import axios from "axios";

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
};

type MovieResponse = {
  page: number;
  results: Movie[];
};

export default function MoviePage() {
  //  useState로 영화 데이터 저장
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //  useEffect로 첫 렌더링 시 API 호출 (의존성 배열 비움)
  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError("");

        //  axios로 TMDB popular API 호출
        const { data } = await axios.get<MovieResponse>(
          "https://api.themoviedb.org/3/movie/popular",
          {
            params: { language: "ko-KR", page: 1 },
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
            signal: controller.signal,
          }
        );

        console.log("불러온 데이터:", data); // 콘솔로 데이터 구조 확인
        setMovies(data.results);
      } catch (e: any) {
        if (e.name !== "CanceledError")
          setError(e.message || "데이터 불러오기 실패");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []); // ← 의존성 배열 비움 (처음 한 번만 실행)

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p className="text-red-600">{error}</p>;


  return (
  <main className="min-h-screen bg-gray-50 px-4 py-8">
    <h1 className="mb-6 text-2xl font-bold">인기 영화</h1>

    {/* ✅ 반응형 그리드 레이아웃 */}
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {movies.map((m) => (
        <MovieCard
          key={m.id}
          title={m.title}
          overview={m.overview}
          posterPath={m.poster_path}
        />
      ))}
    </div>
  </main>
);
}
