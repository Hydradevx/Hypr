export const themes = {
  hydrion: {
    name: "Hydrion",
    background: "bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]",
    sidebar: "bg-black/40 border-blue-800 shadow-[inset_0_0_20px_#0ff]",
    glow: "shadow-[0_0_10px_#00f5ff]",
    text: "text-blue-300",
    hover: "hover:bg-blue-500/20 hover:text-blue-300",
    active: "bg-blue-600/30 text-blue-300 shadow-[0_0_10px_#3b82f6aa]",
  },
  obsidian: {
    name: "Obsidian",
    background: "bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]",
    sidebar: "bg-zinc-900 border-zinc-700 shadow-inner",
    glow: "shadow-none",
    text: "text-neutral-300",
    hover: "hover:bg-neutral-800/40 hover:text-white",
    active: "bg-neutral-700 text-white shadow-inner",
  },
  lumina: {
    name: "Lumina",
    background: "bg-gradient-to-br from-[#f7f7f7] to-[#e2e8f0]",
    sidebar: "bg-white/60 border-gray-200 shadow-xl",
    glow: "shadow-[0_0_8px_#ccc]",
    text: "text-gray-900",
    hover: "hover:bg-gray-200 hover:text-gray-900",
    active: "bg-gray-300 text-gray-900 shadow",
  },
};

export type Theme = keyof typeof themes;
