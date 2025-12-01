// src/components/common/Modal.tsx
import { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30">
      <div
        className="absolute inset-0"
        onClick={onClose}
      />
      <div className="relative z-50">{children}</div>
    </div>
  );
}
