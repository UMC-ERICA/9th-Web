// src/components/cards/LpCard.tsx
import { Link } from "react-router-dom";
import type { Lp } from "../../apis/lpApi";

interface Props {
  lp: Lp;
}

export default function LpCard({ lp }: Props) {
  const likesCount =
    (lp.likes && Array.isArray(lp.likes) && lp.likes.length) ||
    (lp as any).likesCount ||
    0;

  const created = new Date(lp.createdAt).toLocaleDateString("ko-KR");

  return (
    <Link to={`/lp/${lp.id}`}>
      <div className="bg-white rounded-lg shadow overflow-hidden group cursor-pointer">
        <div className="relative h-40 overflow-hidden">
          <img
            src={lp.thumbnail}
            alt={lp.title}
            className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-90 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-white">
            <h3 className="font-semibold text-sm line-clamp-2">{lp.title}</h3>
            <div className="mt-1 text-xs flex justify-between">
              <span>{created}</span>
              <span>좋아요 {likesCount}</span>
            </div>
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-sm line-clamp-1 mb-1">
            {lp.title}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2">
            {lp.content}
          </p>
        </div>
      </div>
    </Link>
  );
}
