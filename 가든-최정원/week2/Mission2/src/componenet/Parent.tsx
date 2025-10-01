import React from "react";
import { useTheme } from "../context/ThemeContext";
import Child from "./Child";

const Parent = () => {
  const { toggleDarkMode } = useTheme();

  return (
    <div>
      <h2>부모 컴포넌트</h2>
      <button onClick={toggleDarkMode}>다크모드 토글</button>
      <Child />
    </div>
  );
};

export default Parent;