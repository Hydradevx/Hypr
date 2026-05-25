"use client"

import { Bell, Settings, Zap } from "lucide-react"

export function Header() {
  return (
    <header className="h-14 px-6 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm">
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
          <Zap className="w-4 h-4 text-primary" />
        </div>

        <div>
          <h1 className="text-sm font-semibold text-foreground">
            Hypr Dashboard
          </h1>

          <p className="text-xs text-muted-foreground">
            Manage your selfbot runtime and activity
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
          <Bell className="w-4 h-4" />

          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
        </button>

        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
          <Settings className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-border mx-2" />

        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/60 to-primary/20 flex items-center justify-center text-xs font-semibold text-primary-foreground cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all">
          HY
        </div>
      </div>
    </header>
  )
}