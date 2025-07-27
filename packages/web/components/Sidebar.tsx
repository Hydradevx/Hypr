import { useState, ChangeEvent } from "react"
import { Link, useLocation } from "react-router-dom"
import * as Icons from "lucide-react"
import { sidebarNav } from "../lib/ui.config"
import clsx from "clsx"
import { useThemeStore } from "../lib/useThemeStore"
import { themes, Theme } from "../lib/themeConfig"
import { useSidebarStore } from "../lib/useSidebarStore"

export default function Sidebar() {
  const { expanded, toggle } = useSidebarStore()
  const location = useLocation()
  const { theme, setTheme } = useThemeStore()
  const activeTheme = themes[theme]

  return (
    <aside
      className={clsx(
        "fixed top-0 left-0 z-50 h-full transition-all duration-300 overflow-hidden",
        expanded ? "w-64" : "w-20"
      )}
    >
      <div
        className={clsx(
          "relative h-full w-full border-r backdrop-blur-2xl transition-colors",
          activeTheme.sidebar
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
                  activeTheme.text,
                  !expanded && "opacity-0 scale-0"
                )}
              >
                Hypr
              </span>
            </div>
          </div>

          <button
            onClick={() => toggle()}
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
                  active ? activeTheme.active : `${activeTheme.hover} ${activeTheme.text}`
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
  <div className="relative">
    <select
      value={theme}
      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
        setTheme(e.target.value as Theme)
      }
      className={clsx(
        "w-full appearance-none rounded-md border px-10 py-2 bg-transparent text-sm font-medium transition-all",
        activeTheme.text,
        activeTheme.inputBorder || "border-blue-400/50"
      )}
    >
      {Object.entries(themes).map(([key, value]) => (
        <option key={key} value={key} className="bg-black text-white">
          {value.name}
        </option>
      ))}
    </select>

    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
      {(() => {
        const Icon = Icons[themes[theme].icon as keyof typeof Icons]
        return <Icon className="w-4 h-4 opacity-80" />
      })()}
    </div>

    <Icons.ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60 pointer-events-none" />
  </div>
</div>


        <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 animate-pulse blur-lg" />
      </div>
    </aside>
  )
}
