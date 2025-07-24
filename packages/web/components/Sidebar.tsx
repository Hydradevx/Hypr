import { useState, ChangeEvent } from "react"
import { Link, useLocation } from "react-router-dom"
import * as Icons from "lucide-react"
import { sidebarNav } from "../lib/ui.config"
import clsx from "clsx"
import ElectricParticles from "./ElectricParticles"
import { useThemeStore } from "../lib/useThemeStore"

type Theme = "hydrion" | "obsidian" | "lumina"

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true)
  const location = useLocation()
  const { theme, setTheme } = useThemeStore()

  return (
    <aside
      className={clsx(
        "fixed top-0 left-0 z-50 h-full transition-all duration-300 overflow-hidden",
        expanded ? "w-64" : "w-20"
      )}
    >
      <ElectricParticles />
      <div
        className={clsx(
          "relative h-full w-full border-r backdrop-blur-2xl shadow-[0_0_30px] transition-colors",
          theme === "hydrion" && "bg-gradient-to-br from-[#0f172a]/60 via-[#1e293b]/60 to-[#0f172a]/60 border-blue-500/40 shadow-blue-500/50",
          theme === "obsidian" && "bg-gradient-to-br from-black/50 via-neutral-900/60 to-black/50 border-gray-700 shadow-gray-800",
          theme === "lumina" && "bg-gradient-to-br from-white/80 via-gray-100/80 to-white/80 border-gray-200 shadow-gray-300"
        )}
      >
        <div className="flex flex-col items-start gap-3 px-4 pt-5">
          <div className="flex items-center gap-2 w-full justify-between">
            <div className="flex items-center gap-2">
              <img
                src="/hypr.jpg"
                alt="Hypr"
                className={clsx(
                  "w-12 h-12 rounded-full object-cover shadow-[0_0_12px_#3b82f6]",
                  !expanded && "opacity-0 scale-0"
                )}
              />
              <span
                className={clsx(
                  "text-xl font-bold tracking-wide transition-all",
                  theme === "hydrion" && "text-blue-300",
                  theme === "obsidian" && "text-white",
                  theme === "lumina" && "text-gray-800",
                  !expanded && "opacity-0 scale-0"
                )}
              >
                Hypr
              </span>
            </div>
          </div>

          <button
            onClick={() => setExpanded((v) => !v)}
            className={clsx(
              "self-center rounded-full p-1 transition-all duration-200",
              "bg-blue-500/30 hover:bg-blue-500/50 shadow-[0_0_8px_#3b82f6aa]"
            )}
          >
            {expanded ? (
              <Icons.ChevronLeft className="w-5 h-5 text-blue-200" />
            ) : (
              <Icons.ChevronRight className="w-5 h-5 text-blue-200" />
            )}
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-1 px-2">
          {sidebarNav.map(({ path, name, icon }) => {
            const Icon = Icons[icon as keyof typeof Icons]
            const active = location.pathname === path

            return (
              <Link
                key={path}
                to={path}
                title={!expanded ? name : undefined}
                className={clsx(
                  "group flex items-center gap-4 rounded-xl px-4 py-2 text-sm font-medium transition-all",
                  active
                    ? "bg-blue-600/30 text-blue-300 shadow-[0_0_10px_#3b82f6aa]"
                    : "hover:bg-blue-500/20 text-white/80 hover:text-blue-300"
                )}
              >
                <Icon className="w-5 h-5" />
                <span
                  className={clsx(
                    "transition-all",
                    !expanded && "opacity-0 w-0 overflow-hidden"
                  )}
                >
                  {name}
                </span>
              </Link>
            )
          })}
        </div>

        <div className="absolute bottom-4 left-0 w-full px-4">
          <select
            value={theme}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setTheme(e.target.value as Theme)
            }
            className="bg-transparent border p-2 text-white w-full rounded-md"
          >
            <option value="hydrion">Hydrion</option>
            <option value="obsidian">Obsidian</option>
            <option value="lumina">Lumina</option>
          </select>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 animate-pulse blur-lg" />
      </div>
    </aside>
  )
}
