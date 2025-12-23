import type { Movie } from "../types/movie";

interface ModalProps {
  movie: Movie;
  onClose: () => void;
}

const Modal = ({ movie, onClose }: ModalProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const backdropBaseUrl = "https://image.tmdb.org/t/p/original";
  const fallbackImage = "http://via.placeholder.com/640x480";

  const handleImdbSearch = () => {
    const searchUrl = `https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`;
    window.open(searchUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        
        {/* 상단 헤더 배경 */}
        <div className="relative h-60 w-full">
          <img
            src={movie.backdrop_path ? `${backdropBaseUrl}${movie.backdrop_path}` : fallbackImage}
            className="h-full w-full object-cover"
            alt="header"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8 text-white">
            <h2 className="text-3xl font-bold">{movie.title}</h2>
            <p className="text-sm opacity-80">{movie.original_title}</p>
          </div>
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-black/20 p-2 text-white hover:bg-black/40 transition-all"
          >
            <span className="text-xl leading-none">✕</span>
          </button>
        </div>

        {/* 컨텐츠 영역 (가로 배치) */}
        <div className="flex flex-col md:flex-row p-8 gap-8">
          
          {/* 왼쪽: 포스터 */}
          <div className="w-full md:w-56 shrink-0">
            <img
              src={movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : fallbackImage}
              className="w-full rounded-xl shadow-lg border border-gray-100"
              alt="poster"
            />
          </div>

          {/* 오른쪽: 상세 정보 (왼쪽 정렬 스타일로 변경) */}
          <div className="flex flex-col flex-1 text-center"> {/* [ ] text-center를 text-left로 변경 */}
            
            {/* 평점 및 평가 (왼쪽 정렬) */}
            <div className="mb-4 flex items-baseline"> 
               <span className="text-2xl font-bold text-blue-500">{movie.vote_average.toFixed(1)}</span>
               <span className="ml-2 text-gray-400 text-sm">({movie.vote_count} 평가)</span>
            </div>

            <div className="space-y-5">
              <section>
                <h3 className="text-base font-bold text-gray-800 mb-1">개봉일</h3>
                <p className="text-gray-600 text-sm">{movie.release_date}</p>
              </section>

              <section>
                <h3 className="text-base font-bold text-gray-800 mb-2">인기도</h3>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-400 transition-all duration-1000" 
                      style={{ width: `${Math.min(movie.popularity / 10, 100)}%` }}
                    />
                </div>
              </section>

              <section>
                <h3 className="text-base font-bold text-gray-800 mb-1">줄거리</h3>
                {/* 텍스트가 왼쪽에서 시작하도록 설정 */}
                <p className="text-sm leading-relaxed text-gray-500 text-center">
                  {movie.overview || "상세 개요가 없습니다."}
                </p>
              </section>
            </div>

            {/* 하단 버튼 (왼쪽 정렬 유지 또는 가운데 정렬 선택 가능) */}
            <div className="mt-auto pt-6 flex justify-start gap-3"> {/* [ ] justify-center를 justify-start로 변경 */}
              <button
                onClick={handleImdbSearch}
                className="rounded-xl bg-blue-500 px-6 py-3 font-bold text-white hover:bg-blue-600 shadow-md transition-all"
              >
                IMDb에서 검색
              </button>
              <button
                onClick={onClose}
                className="rounded-xl border border-blue-400 px-6 py-3 font-bold text-blue-500 hover:bg-blue-50 transition-all"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;