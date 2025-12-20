import { useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { useCustomFetch } from "../hooks/useCustomFetch";
import type { MovieResponse } from "../types/movie";

export default function MoviesPage(): JSX.Element {
  const location = useLocation();

  let category = "popular";
  if (location.pathname.includes("upcoming")) category = "upcoming";
  else if (location.pathname.includes("top-rated")) category = "top_rated";
  else if (location.pathname.includes("now-playing")) category = "now_playing";

  const API_KEY = import.meta.env.VITE_TMDB_KEY;
  const url = `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=1`;
  const headers = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: "application/json",
    },
  };

  const { data, loading, error } = useCustomFetch<MovieResponse>(url, headers);

  if (loading) return <div className="text-center mt-10 text-gray-400">⏳ 로딩 중...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="p-10">
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {data?.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
