import { useParams } from "react-router-dom";
import { useCustomFetch } from "../hooks/useCustomFetch";
import type { MovieDetails, Cast } from "../types/moviedetail";

export default function MovieDetailPage(): JSX.Element {
  const { movieId } = useParams<{ movieId: string }>();
  const API_KEY = import.meta.env.VITE_TMDB_KEY;

  const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;
  const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`;
  const headers = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: "application/json",
    },
  };

  const { data: movie, loading, error } = useCustomFetch<MovieDetails>(movieUrl, headers);
  const { data: credits } = useCustomFetch<{ cast: Cast[] }>(creditsUrl, headers);

  if (loading) return <div className="text-center mt-10 text-white">⏳ 로딩 중...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!movie) return <div className="text-center mt-10 text-gray-400">영화 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="text-white max-w-4xl mx-auto mt-10">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg w-full md:w-1/3"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-400 mb-2">개봉일: {movie.release_date}</p>
          <p className="text-gray-400 mb-2">평점: ⭐ {movie.vote_average}</p>
          <p className="text-gray-400 mb-2">상영 시간: {movie.runtime}분</p>
          <p className="mt-4 text-lg leading-relaxed">{movie.overview}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">출연진</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {credits?.cast.slice(0, 10).map((cast) => (
          <div key={cast.id} className="text-center">
            <img
              src={
                cast.profile_path
                  ? `https://image.tmdb.org/t/p/w200${cast.profile_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={cast.name}
              className="rounded-lg mx-auto"
            />
            <p className="font-semibold mt-2">{cast.name}</p>
            <p className="text-sm text-gray-400">{cast.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
