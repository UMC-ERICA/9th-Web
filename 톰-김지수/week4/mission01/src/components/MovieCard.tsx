type Props = {
  title: string;
  overview: string;
  posterPath: string | null;
};

const posterUrl = (path: string | null) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : "https://placehold.co/500x750?text=No+Image";

export function MovieCard({ title, overview, posterPath }: Props) {
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-white shadow transition-shadow hover:shadow-lg cursor-pointer">
      {/* 포스터 */}
      <img
        src={posterUrl(posterPath)}
        alt={title}
        loading="lazy"
        className="aspect-[2/3] w-full object-cover transition filter group-hover:blur-sm"
      />

      {/* Hover Overlay */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="p-3 text-white">
          <h2 className="line-clamp-2 text-sm font-semibold sm:text-base">{title}</h2>
          <p className="mt-1 line-clamp-3 text-xs text-gray-200">
            {overview || "줄거리 정보가 없습니다."}
          </p>
        </div>
      </div>
    </article>
  );
}
