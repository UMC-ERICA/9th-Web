import { type FormEvent, useState } from "react";
import { axiosClient } from "../apis/axiosClient";
import type { Movie, MovieResponse } from "../types/movie";
import MovieModal from "../components/MovieModal";

const Homepage = () => {
  // 검색 입력 상태 관리
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("ko-KR");

  // 검색 결과 및 로딩 상태 관리
  const [searchResults, setSearchResults] = useState<MovieResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 모달 상태 관리
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // 검색 폼 제출 핸들러
  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 검색어가 비어있으면 검색하지 않음
    if (!searchQuery.trim()) {
      setError("영화 제목을 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axiosClient.get<MovieResponse>("/search/movie", {
        params: {
          query: searchQuery,
          include_adult: includeAdult,
          language: language,
        },
      });

      setSearchResults(data);

      if (data.results.length === 0) {
        setError("검색 결과가 없습니다.");
      }
    } catch (err) {
      setError("영화 검색 중 오류가 발생했습니다.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // 영화 카드 클릭 핸들러
  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* 검색 섹션 */}
      <div className="bg-gray-50 rounded-xl p-6 md:p-8 mb-8 shadow-md">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          🎬 영화 검색
        </h1>

        <form onSubmit={handleSearch} className="flex flex-col gap-6">
          {/* 영화 제목 입력 */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="movie-title"
              className="font-semibold text-gray-700 text-sm">
              영화 제목
            </label>
            <input
              id="movie-title"
              type="text"
              placeholder="영화 제목을 입력하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          {/* 성인 콘텐츠 포함 여부 */}
          <div className="flex items-center">
            <label
              htmlFor="include-adult"
              className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
              <input
                id="include-adult"
                type="checkbox"
                checked={includeAdult}
                onChange={(e) => setIncludeAdult(e.target.checked)}
                className="w-5 h-5 cursor-pointer accent-blue-500"
              />
              <span>성인 콘텐츠 포함</span>
            </label>
          </div>

          {/* 언어 선택 */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="language"
              className="font-semibold text-gray-700 text-sm">
              언어
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-4 py-3 text-base border-2 border-gray-300 rounded-lg bg-white cursor-pointer focus:outline-none focus:border-blue-500 transition-colors duration-200">
              <option value="ko-KR">한국어</option>
              <option value="en-US">영어</option>
              <option value="ja-JP">일본어</option>
            </select>
          </div>

          {/* 검색 버튼 */}
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3.5 text-base font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98] mt-2">
            {isLoading ? "검색 중..." : "검색"}
          </button>
        </form>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="bg-red-50 text-red-800 p-4 rounded-lg mb-8 border border-red-200">
          <p className="m-0">{error}</p>
        </div>
      )}

      {/* 검색 결과 */}
      {searchResults && searchResults.results.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            검색 결과 ({searchResults.total_results}개)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {searchResults.results.map((movie) => (
              <div
                key={movie.id}
                onClick={() => handleMovieClick(movie)}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                {/* 포스터 */}
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-72 object-cover"
                  />
                ) : (
                  <div className="w-full h-72 bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                    <span className="text-white font-semibold">
                      포스터 없음
                    </span>
                  </div>
                )}

                {/* 영화 정보 */}
                <div className="p-4">
                  <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2 line-clamp-1">
                    {movie.original_title}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    개봉일: {movie.release_date || "미정"}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span className="text-yellow-500">
                      ⭐ {movie.vote_average.toFixed(1)}
                    </span>
                    <span className="text-gray-500 text-xs font-normal">
                      ({movie.vote_count})
                    </span>
                  </div>
                  {movie.adult && (
                    <span className="inline-block bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold mt-2">
                      🔞 성인
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 영화 상세 모달 */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Homepage;
