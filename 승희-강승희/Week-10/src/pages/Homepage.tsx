import { useCallback, useMemo, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import useFetch from "../hooks/useFetch";
import type { MovieFilters, MovieResponse } from "../types/movie";

export default function Homepage() {
    const [filters, setFilters] = useState<MovieFilters>({
        query: "어벤져스",
        include_adult: false,
        language: "ko-KR",
    });

    const axiosRequestConfig = useMemo(() => ({
        params: filters,
    }), [filters]);

    const handleMovieFilters = useCallback((filters: MovieFilters) =>{
        setFilters(filters);
    }, [setFilters]);

    const { data, error, isLoading } = useFetch<MovieResponse>('/search/movie', axiosRequestConfig);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container">
            <MovieFilter onChange={handleMovieFilters} />
            { isLoading ? (
                <div>로딩 중 입니다...</div>
            ) : (
                <MovieList movies={data?.results || []} />
            )}
        </div>
    );
}