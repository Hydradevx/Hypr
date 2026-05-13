import { create } from "zustand"

type SidebarStore = {
  expanded: boolean
  toggle: () => void
  set: (v: boolean) => void
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  expanded: true,
  toggle: () => set((s) => ({ expanded: !s.expanded })),
  set: (v) => set({ expanded: v }),
}))
