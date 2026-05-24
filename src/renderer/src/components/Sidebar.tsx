"use client"

import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import {
  LayoutDashboard,
  Terminal,
  Gamepad2,
  Sliders,
  Settings,
  Zap,
  ChevronRight,
  Wifi,
} from "lucide-react"

import { cn } from "../lib/utils"

const navItems = [
  {
    path: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
    shortcut: "D",
  },
  {
    path: "/logs",
    label: "Logs",
    icon: Terminal,
    shortcut: "L",
  },
  {
    path: "/controls",
    label: "Controls",
    icon: Sliders,
    shortcut: "C",
  },
  {
    path: "/rpc",
    label: "Rich Presence",
    icon: Gamepad2,
    shortcut: "R",
  },
  {
    path: "/settings",
    label: "Settings",
    icon: Settings,
    shortcut: "S",
  }
]

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const [ping, setPing] = useState(0)

  useEffect(() => {
    const fetchPing = async () => {
      try {
        const stats =
          await window.hypr.getBotStats()

        setPing(stats.ping || 0)
      } catch (err) {
        console.error(err)
      }
    }

    fetchPing()

    const interval =
      setInterval(fetchPing, 2000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleKey = (
      e: KeyboardEvent
    ) => {
      if (!e.ctrlKey) return

      const key = e.key.toLowerCase()

      const item = navItems.find(
        (i) =>
          i.shortcut.toLowerCase() === key
      )

      if (!item) return

      e.preventDefault()

      navigate(item.path)
    }

    window.addEventListener(
      "keydown",
      handleKey
    )

    return () => {
      window.removeEventListener(
        "keydown",
        handleKey
      )
    }
  }, [navigate])

  return (
    <aside className="w-56 h-screen flex flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="h-14 px-4 flex items-center gap-3 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Zap className="w-4 h-4 text-primary" />
        </div>

        <span className="text-base font-semibold text-foreground tracking-tight">
          Hypr
        </span>

        <span className="ml-auto px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground bg-muted rounded">
          v2
        </span>
      </div>

      {/* User */}
      <div className="p-3">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-secondary/50">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/60 to-primary/20 flex items-center justify-center text-xs font-semibold text-primary-foreground">
            HY
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              Hypr Client
            </p>

            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />

              <span className="text-xs text-muted-foreground">
                Online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon

            const isActive =
              location.pathname === item.path

            return (
              <button
                key={item.path}
                onClick={() =>
                  navigate(item.path)
                }
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 group",
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4",
                    isActive &&
                      "text-primary"
                  )}
                />

                <span className="flex-1 text-left font-medium">
                  {item.label}
                </span>

                <kbd className="hidden group-hover:flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground bg-muted rounded">
                  CTRL+
                  {item.shortcut}
                </kbd>

                {isActive && (
                  <ChevronRight className="w-3 h-3 text-muted-foreground" />
                )}
              </button>
            )
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="px-3 py-2 rounded-lg bg-green-400/10">
          <div className="flex items-center gap-2">
            <Wifi className="w-3.5 h-3.5 text-green-400" />

            <span className="text-xs font-medium text-green-400">
              Connected
            </span>

            <span className="ml-auto text-xs text-muted-foreground">
              {ping}ms
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}