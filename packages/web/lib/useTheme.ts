import { useContext } from "react";
import { ThemeContext } from "./themeContext";

export const useTheme = () => useContext(ThemeContext);
