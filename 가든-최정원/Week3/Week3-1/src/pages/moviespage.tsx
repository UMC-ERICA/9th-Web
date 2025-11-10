import { useEffect, useState } from 'react';
import type { Movie, MovieResponse } from '../types/movie';
import axios from 'axios';
import MovieCard from '../components/moviecard';

export default function MoviesPage() : Element{
    const [movies,setMovies] = useState<Movie[]>([]);

    useEffect(() : void => {
        const fetchMovies = async () : Promise<void> => {
            const {data} = await axios(
                `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`,
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        accept: 'application/json',
                    },
                }
            );

            setMovies(data.results);
        };

        fetchMovies(); 
    }, []);
    
return(
    <div className = 'p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
    lg:grid-cols-5 xl:grid-cols-6'>
        {movies.map((movie) : JSX.Element => (
            <MovieCard key = {movie.id} movie={movie} />
        ))}
    </div>
    );
}