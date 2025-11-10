export interface MovieDetails {
  id: number
  title: string
  overview: string
  release_date: string
  poster_path: string
  vote_average: number
  runtime: number
}

export interface Cast {
  id: number
  name: string
  character: string
  profile_path: string | null
}
