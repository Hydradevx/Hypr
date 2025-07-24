import { Theme } from "./themeConfig";
import { create } from "zustand";

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: "hydrion",
  setTheme: (theme) => set({ theme }),
}));
