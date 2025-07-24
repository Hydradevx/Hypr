import { create } from "zustand"

type Theme = "hydrion" | "obsidian" | "lumina"

export const useThemeStore = create<{
  theme: Theme
  setTheme: (t: Theme) => void
}>((set) => ({
  theme: "hydrion",
  setTheme: (t) => set({ theme: t })
}))
