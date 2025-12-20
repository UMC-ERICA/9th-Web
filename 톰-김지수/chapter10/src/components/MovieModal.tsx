import { type Movie } from "../types/movie";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  // IMDb 검색 URL 생성
  const handleIMDbSearch = () => {
    const searchQuery = encodeURIComponent(movie.title);
    const imdbUrl = `https://www.imdb.com/find?q=${searchQuery}`;
    window.open(imdbUrl, "_blank");
  };

  // 배경 클릭 시 모달 닫기
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={handleBackdropClick}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl animate-slideUp">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black bg-opacity-60 backdrop-blur-sm text-white flex items-center justify-center text-2xl hover:bg-opacity-80 transition-all duration-200 hover:scale-110 active:scale-95 z-10">
          ✕
        </button>

        {/* 포스터 이미지 */}
        <div className="w-full h-96 overflow-hidden rounded-t-2xl relative">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
              <span className="text-white text-xl font-semibold">
                포스터 없음
              </span>
            </div>
          )}
        </div>

        {/* 영화 정보 */}
        <div className="p-8">
          {/* 제목 */}
          <h2 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">
            {movie.title}
          </h2>

          {/* 원제 */}
          {movie.original_title !== movie.title && (
            <p className="text-lg text-gray-500 mb-6 italic">
              {movie.original_title}
            </p>
          )}

          {/* 평점 및 개봉일 */}
          <div className="flex gap-8 mb-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span className="text-2xl font-bold text-yellow-500">
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-sm text-gray-500">
                ({movie.vote_count} votes)
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <span className="text-xl">📅</span>
              <span>{movie.release_date || "개봉일 미정"}</span>
            </div>
          </div>

          {/* 언어 및 성인 콘텐츠 표시 */}
          <div className="flex gap-3 mb-4">
            <span className="px-3 py-2 rounded-md text-sm font-semibold bg-blue-50 text-blue-700">
              {movie.original_language.toUpperCase()}
            </span>
            {movie.adult && (
              <span className="px-3 py-2 rounded-md text-sm font-semibold bg-red-500 text-white">
                🔞 성인
              </span>
            )}
          </div>

          {/* 인기도 */}
          <div className="flex items-center gap-2 mb-6 text-gray-700">
            <span className="font-semibold">인기도:</span>
            <span className="font-bold text-blue-500 text-lg">
              {movie.popularity.toFixed(0)}
            </span>
          </div>

          {/* 줄거리 */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">줄거리</h3>
            <p className="text-base leading-relaxed text-gray-700 text-justify">
              {movie.overview || "줄거리 정보가 없습니다."}
            </p>
          </div>

          {/* 액션 버튼들 */}
          <div className="flex gap-4">
            <button
              onClick={handleIMDbSearch}
              className="flex-1 px-6 py-3.5 text-base font-semibold rounded-lg bg-yellow-400 text-black shadow-lg shadow-yellow-400/30 hover:bg-yellow-500 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-yellow-400/40 transition-all duration-200 active:translate-y-0">
              IMDb에서 검색하기
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3.5 text-base font-semibold rounded-lg bg-gray-500 text-white shadow-lg shadow-gray-500/30 hover:bg-gray-600 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gray-500/40 transition-all duration-200 active:translate-y-0">
              닫기
            </button>
          </div>
        </div>
      </div>

      {/* 애니메이션을 위한 스타일 */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MovieModal;
