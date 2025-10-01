import React, { createContext, useContext, useState, ReactNode } from "react";

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme은 ThemeProvider 안에서만 사용해야 합니다.");
  }
  return context;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
  setDarkMode((prev) => {
    const newMode = !prev;
    document.body.classList.toggle("dark", newMode);
    return newMode;
        });    
    }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};