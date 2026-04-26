import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("dark") === "true"
  );

  useEffect(() => {
    localStorage.setItem("dark", darkMode);
    document.body.style.background = darkMode ? "#111" : "#f5f5f5";
    document.body.style.color = darkMode ? "#fff" : "#000";
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 👇 ده المهم علشان نستخدمه في أي صفحة
export const useTheme = () => useContext(ThemeContext);