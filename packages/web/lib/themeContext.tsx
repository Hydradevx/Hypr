"use client";
import { createContext, useContext, useState } from "react";
import { themes } from "./themeConfig";

export const ThemeContext = createContext({
  theme: "hydrion",
  setTheme: (_: keyof typeof themes) => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<keyof typeof themes>("hydrion");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
