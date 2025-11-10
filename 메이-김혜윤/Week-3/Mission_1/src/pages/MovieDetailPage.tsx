import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { MovieInfo } from "../types/movieinfo";
import MovieContent from "../components/MovieContent";
import { MovieCredit } from "../types/moviecredit";
import useCustomFetch from "../hook/useCustomFetch";

export default function MovieDetailPage() {
  const params = useParams();

  const movieInfoUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}movie/${params.movieId}`;
  const { 
    data: movieInfo, 
    isPending: isMovieInfoPending, 
    isError: isMovieInfoError 
  } = useCustomFetch<MovieInfo>(movieInfoUrl, 'ko-KR');

  const movieCreditUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}movie/${params.movieId}/credits`;
  const { 
    data: movieCredit, 
    isPending: isMovieCreditPending, 
    isError: isMovieCreditError 
  } = useCustomFetch<MovieCredit>(movieCreditUrl, 'ko-KR');

  // 전체 로딩 상태와 에러 상태를 통합
  const isPending = isMovieInfoPending || isMovieCreditPending;
  const isError = isMovieInfoError || isMovieCreditError;

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  return (
    <>
      {isPending && (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    )}

    {!isPending && (
      <div className="p-10 grid gap-4">
        {movieInfo && movieCredit && (<MovieContent movie={movieInfo} movieCredit={movieCredit}/>)}  
      </div>
    )}
    </>
  );
}