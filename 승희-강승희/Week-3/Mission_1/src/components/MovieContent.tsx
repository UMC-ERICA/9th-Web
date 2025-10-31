import { MovieInfo } from "../types/movieinfo";
import { MovieCredit } from "../types/moviecredit";

interface MovieContentProps {
    movie: MovieInfo;
    movieCredit: MovieCredit;
}

export default function MovieContent({ movie, movieCredit }: MovieContentProps) {
    // 출연진 프로필 이미지 클래스 (원형, 크기)
    const profileImageClass = "w-24 h-24 rounded-full object-cover shadow-md"; 

    // 배경 이미지 경로 (w1280 또는 original 사용)
    const backdropUrl = movie.backdrop_path
    ? `${import.meta.env.VITE_TMDB_IMAGE_URL}w1280${movie.backdrop_path}`
    : 'https://placehold.co/1280x720/333333/cccccc?text=No+Background'; // 대체 배경 이미지

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* 상단 배경 이미지 섹션 */}
            <div 
                className="relative w-full h-[500px] bg-cover bg-center"
                style={{ backgroundImage: `url(${backdropUrl})` }}
            >
            {/* 배경 오버레이 (텍스트 가독성을 높이기 위함) */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent flex items-start p-10">
                <div className="max-w-4xl mt-20">
                    <h1 className="text-6xl font-bold text-white mb-3">{movie.title}</h1>

                    {/* 평점, 연도, 상영시간 정보 */}
                    <div className="flex items-center space-x-4 text-gray-300 text-lg mb-4">
                        {movie.vote_average > 0 && (
                        <span className="font-semibold">평점 {movie.vote_average.toFixed(1)}</span>
                        )}
                        {movie.release_date && <span>{movie.release_date.split('-')[0]}</span>} {/* 연도만 표시 */}
                        {movie.runtime > 0 && <span>{movie.runtime}분</span>}
                    </div>

                    {/* 영화 줄거리 */}
                    <p className="text-gray-200 text-lg leading-relaxed max-w-2xl mb-6 max-h-52 overflow-y-auto">
                        {movie.overview || "영화 줄거리 정보가 없습니다."}
                    </p>
                </div>
            </div>
        </div>

        {/* 출연진 섹션 */}
        <div className="p-10 bg-gray-900">
            {/* 감독/출연진 헤딩 */}
            <h3 className="text-3xl font-bold text-white mb-6">감독/출연</h3>

            <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-x-4 gap-y-8 justify-items-center">
                {/* 출연진 정보 맵핑 (최대 20명만 표시) */}
                {movieCredit?.cast?.length > 0 ? (
                movieCredit.cast.slice(0, 20).map((cast) => (
                <div key={cast.id} className="flex flex-col items-center text-center w-32">
                    {cast.profile_path ? (
                        <img
                            src={`${import.meta.env.VITE_TMDB_IMAGE_URL}w200${cast.profile_path}`}
                            alt={`${cast.name} 프로필`}
                            className={profileImageClass}
                        />
                    ) : (
                        // 프로필 이미지가 없을 때 대체 UI
                        <div className={`${profileImageClass} flex items-center justify-center bg-gray-700 text-gray-400 text-xs`}>
                            {cast.name.split(' ')[0]}
                        </div>
                        )}
                        <span className="text-base font-semibold text-white mt-2">{cast.name}</span>
                        <span className="text-sm text-gray-400">{cast.character || "역할 정보 없음"}</span>
                </div>
                ))
            ) : (
                <p className="text-gray-400 w-full text-center">출연진 정보가 없습니다.</p>
            )}
            </div>
        </div>
    </div>
    );
}
