"use client"

import { useEffect, useState } from "react"
import { cn } from "../lib/utils"

import {
  Palette,
  Save,
  Settings as SettingsIcon,
  Shield,
  Terminal,
  Moon,
} from "lucide-react"

type Config = {
  token?: string
  prefix?: string
  theme?: string
  autoReconnect?: boolean
  startupRPC?: boolean
  [key: string]: any
}

const sections = [
  {
    id: "general",
    label: "General",
    icon: SettingsIcon,
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
  },
  {
    id: "advanced",
    label: "Advanced",
    icon: Terminal,
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
  },
]

export default function Settings() {
  const [activeSection, setActiveSection] =
    useState("general")

  const [config, setConfig] =
    useState<Config | null>(null)

  const [loading, setLoading] =
    useState(true)

  const [saving, setSaving] =
    useState(false)

  const [hasChanges, setHasChanges] =
    useState(false)

  useEffect(() => {
    async function loadConfig() {
      try {
        const data =
          await window.hypr.getConfig()

        setConfig(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadConfig()
  }, [])

  const updateSetting = (
    key: string,
    value: any
  ) => {
    setConfig((prev) =>
      prev
        ? {
            ...prev,
            [key]: value,
          }
        : prev
    )

    setHasChanges(true)
  }

  const saveSettings = async () => {
    if (!config) return

    try {
      setSaving(true)

      await window.hypr.saveConfig(
        config
      )

      setHasChanges(false)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  if (loading || !config) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Loading settings...
      </div>
    )
  }

  const renderContent = () => {
    switch (activeSection) {
      case "general":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                General Settings
              </h2>

              <p className="text-sm text-muted-foreground mt-1">
                Configure your client
              </p>
            </div>

            <div className="space-y-4">
              {/* Token */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">
                  Token
                </label>

                <input
                  type="password"
                  value={
                    config.token || ""
                  }
                  onChange={(e) =>
                    updateSetting(
                      "token",
                      e.target.value
                    )
                  }
                  className="w-full h-11 px-4 rounded-lg bg-secondary border border-border text-foreground outline-none font-mono"
                />
              </div>

              {/* Prefix */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">
                  Prefix
                </label>

                <input
                  value={
                    config.prefix || ""
                  }
                  onChange={(e) =>
                    updateSetting(
                      "prefix",
                      e.target.value
                    )
                  }
                  className="w-full h-11 px-4 rounded-lg bg-secondary border border-border text-foreground outline-none"
                />
              </div>
            </div>
          </div>
        )

      case "appearance":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Appearance
              </h2>

              <p className="text-sm text-muted-foreground mt-1">
                Customize the UI
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground block mb-3">
                  Theme
                </label>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    "dark",
                    "midnight",
                    "purple",
                  ].map((theme) => (
                    <button
                      key={theme}
                      onClick={() =>
                        updateSetting(
                          "theme",
                          theme
                        )
                      }
                      className={cn(
                        "h-20 rounded-xl border transition-all flex flex-col items-center justify-center gap-2",
                        config.theme ===
                          theme
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-secondary text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Moon className="w-5 h-5" />

                      <span className="text-sm capitalize font-medium">
                        {theme}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case "advanced":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Advanced
              </h2>

              <p className="text-sm text-muted-foreground mt-1">
                Extra functionality
              </p>
            </div>

            <div className="space-y-4">
              {/* Auto reconnect */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary border border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Auto Reconnect
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Reconnect if
                    Discord disconnects
                  </p>
                </div>

                <button
                  onClick={() =>
                    updateSetting(
                      "autoReconnect",
                      !config.autoReconnect
                    )
                  }
                  className={cn(
                    "w-12 h-6 rounded-full transition-all relative",
                    config.autoReconnect
                      ? "bg-primary"
                      : "bg-muted"
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                      config.autoReconnect
                        ? "left-7"
                        : "left-1"
                    )}
                  />
                </button>
              </div>

              {/* Startup RPC */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary border border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Startup RPC
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Enable RPC on
                    startup
                  </p>
                </div>

                <button
                  onClick={() =>
                    updateSetting(
                      "startupRPC",
                      !config.startupRPC
                    )
                  }
                  className={cn(
                    "w-12 h-6 rounded-full transition-all relative",
                    config.startupRPC
                      ? "bg-primary"
                      : "bg-muted"
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                      config.startupRPC
                        ? "left-7"
                        : "left-1"
                    )}
                  />
                </button>
              </div>
            </div>
          </div>
        )

      case "security":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Security
              </h2>

              <p className="text-sm text-muted-foreground mt-1">
                Local client
                security info
              </p>
            </div>

            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-400" />

                <div>
                  <p className="text-sm font-medium text-green-400">
                    Local Config
                    Storage Active
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Your config is
                    stored locally on
                    your machine
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-56 border-r border-border p-4">
        <div className="space-y-1">
          {sections.map((section) => {
            const Icon = section.icon

            const isActive =
              activeSection ===
              section.id

            return (
              <button
                key={section.id}
                onClick={() =>
                  setActiveSection(
                    section.id
                  )
                }
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
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

                <span className="font-medium">
                  {section.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto p-6">
          {renderContent()}
        </div>

        {/* Save Bar */}
        {hasChanges && (
          <div className="px-6 py-4 border-t border-border bg-card/50 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              You have unsaved
              changes
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setHasChanges(false)
                }
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Discard
              </button>

              <button
                onClick={saveSettings}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />

                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}