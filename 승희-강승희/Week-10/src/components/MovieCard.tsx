import type{ Movie } from "../types/movie";
import { useState } from "react";
import Modal from "./Modal";

interface MovieCardProps{
    movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
    const fallbackImageImage = "http://via.placeholder.com/640x480";

    return (
        <>
            <div 
                className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:-translate-y-2 hover:shadow-xl"
                onClick={() => setIsModalOpen(true)}
            >
                {/* 포스터 영역: 이미지 비율을 일정하게 유지 (aspect-[2/3]) */}
                <div className="relative aspect-[2/3] overflow-hidden">
                    <img 
                        src={movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : fallbackImageImage}
                        alt={`${movie.title} 포스터`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* 평점 배지: 이미지처럼 파란색 배경으로 변경 */}
                    <div className="absolute right-2 top-2 rounded-md bg-blue-600 px-2 py-1 text-xs font-bold text-white shadow-sm">
                        {movie.vote_average.toFixed(1)}
                    </div>
                </div>

                {/* 텍스트 영역: 중앙 정렬 및 텍스트 줄 제한 (line-clamp) */}
                <div className="flex flex-1 flex-col p-5 text-center">
                    <h3 className="mb-2 line-clamp-1 text-lg font-extrabold text-gray-800">
                        {movie.title}
                    </h3>
                    <p className="mb-3 text-xs font-medium text-gray-400">
                        {movie.release_date}
                    </p>
                    <p className="line-clamp-3 text-sm leading-relaxed text-gray-500">
                        {movie.overview || "영화 상세 정보가 없습니다."}
                    </p>
                </div>
            </div>

            {isModalOpen && (
                <Modal movie={movie} onClose={() => setIsModalOpen(false)} />
            )}
        </>
    );
};

export default MovieCard;