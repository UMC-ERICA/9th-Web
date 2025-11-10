export type Movie = {
  adult : boolean;
  backdrop_path : String;
  genre_ids : number[];
  id: number;
  original_language:string;
  original_title : string;
  popularity : number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  video: boolean;
  // 필요하다면 추가 필드도 정의 가능
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};