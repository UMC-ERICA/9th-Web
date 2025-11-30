// src/components/cards/LpCard.tsx
import { useNavigate } from "react-router-dom";
import type { Lp } from "../../apis/lpApi";

interface Props {
  lp: Lp;
}

export default function LpCard({ lp }: Props) {
  const navigate = useNavigate();

  return (
    <div
      className="relative cursor-pointer rounded overflow-hidden shadow hover:shadow-lg transition-transform hover:-translate-y-1"
      onClick={() => navigate(`/lps/${lp.id}`)}   // ← 여기만 바꾸면 끝!
    >
      <div className="h-40 bg-gray-200 overflow-hidden">
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-3 bg-white">
        <h3 className="font-semibold text-sm mb-1 line-clamp-2">
          {lp.title}
        </h3>
        <p className="text-xs text-gray-500">
          {new Date(lp.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
