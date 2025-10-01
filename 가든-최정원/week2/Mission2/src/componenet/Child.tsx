import React from "react";
import { useTheme } from "../context/ThemeContext";

const Child = () => {
  const { darkMode } = useTheme();

  return (
    <div
      style={{
        background: darkMode ? "#333" : "#fff",
        color: darkMode ? "#fff" : "#000",
        padding: "20px",
        marginTop: "10px",
      }}
    >
      <h3>자식 컴포넌트</h3>
      <p>현재 모드: {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}</p>
    </div>
  );
};

export default Child;