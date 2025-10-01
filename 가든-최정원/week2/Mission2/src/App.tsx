import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Parent from "./componenet/Parent";

function App() {
  return (
    <ThemeProvider>
      <Parent />
    </ThemeProvider>
  );
}

export default App;