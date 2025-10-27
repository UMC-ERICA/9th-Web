// src/components/ThemeToggle.tsx
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${isDark ? "bg-neutral-700" : "bg-gray-300"}`}
      aria-label="Toggle dark mode"
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform
                    ${isDark ? "translate-x-5" : "translate-x-1"}`}
      >
        {isDark ? (
          <span className="absolute inset-0 flex items-center justify-center text-xs">🌙</span>
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-xs">☀️</span>
        )}
      </span>
    </button>
  );
}
