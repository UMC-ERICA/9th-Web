import { Link } from 'react-router-dom'
import type { Movie } from '../types/movie'

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps): JSX.Element {
  return (
    <Link to={`/movies/${movie.id}`} className="block relative">
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        className="rounded-lg hover:scale-105 transition-transform"
      />
      <h3 className="text-center mt-2 text-white font-semibold">{movie.title}</h3>
    </Link>
  )
}
