// src/components/layout/FloatingButton.tsx
import { useNavigate } from "react-router-dom";

export default function FloatingButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/upload")}
      className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-blue-600 text-white text-2xl flex items-center justify-center shadow-lg hover:bg-blue-700"
    >
      +
    </button>
  );
}
