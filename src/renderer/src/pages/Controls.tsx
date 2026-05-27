"use client"

import { useEffect, useState } from "react"
import { cn } from "../lib/utils"

import {
  Send,
  History,
  Zap,
  RotateCcw,
} from "lucide-react"

type Channel = {
  id: string
  name: string
}

type Server = {
  id: string
  name: string
  channels: Channel[]
}

type HistoryEntry = {
  command: string
  time: string
}

export default function Controls() {
  const [servers, setServers] = useState<Server[]>([])

  const [selectedServerId, setSelectedServerId] =
    useState("")

  const [selectedChannelId, setSelectedChannelId] =
    useState("")

  const [command, setCommand] = useState("")

  const [history, setHistory] = useState<
    HistoryEntry[]
  >([])

  useEffect(() => {
    async function loadServers() {
      try {
        const data =
          await window.hypr.getServers()

        setServers(data || [])
      } catch (err) {
        console.error(err)
      }
    }

    loadServers()
  }, [])

  
  const [prefix, setPrefix] = useState("!")

  useEffect(() => {
    async function loadPrefix() {
      const config = await window.hypr.getConfig()
      setPrefix(config?.prefix || "!")
    }

    loadPrefix()
  }, [])

  const quickActions = [
    {
      label: "Stop Activity",
      command: `${prefix}stopactivity`,
      icon: RotateCcw,
    },
    {
      label: "Toggle DND",
      command: `${prefix}dnd`,
      icon: Zap,
    },
    {
      label: "Set Idle",
      command: `${prefix}idle`,
      icon: RotateCcw,
    },
  ]


  const selectedServer = servers.find(
    (s) => s.id === selectedServerId
  )

    selectedServer?.channels.find(
      (c) => c.id === selectedChannelId
    )

  const executeCommand = async (
    customCommand?: string
  ) => {
    const finalCommand =
      customCommand || command

    if (
      !selectedChannelId ||
      !finalCommand.trim()
    )
      return

    try {
      await window.hypr.sendCommand(
        selectedChannelId,
        finalCommand.trim()
      )

      setHistory((prev) => [
        {
          command: finalCommand,
          time: "Just now",
        },
        ...prev,
      ])

      if (!customCommand) {
        setCommand("")
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="p-6 h-full">
      <div className="grid grid-cols-3 gap-6 h-full">
        {/* Left */}
        <div className="col-span-2 flex flex-col gap-6">
          {/* Selectors */}
          <div className="grid grid-cols-2 gap-4">
            {/* Server */}
            <div className="rounded-xl bg-card border border-border p-4">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">
                Server
              </label>

              <select
                value={selectedServerId}
                onChange={(e) => {
                  setSelectedServerId(
                    e.target.value
                  )

                  setSelectedChannelId("")
                }}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground outline-none"
              >
                <option value="">
                  Select a server
                </option>

                {servers.map((server) => (
                  <option
                    key={server.id}
                    value={server.id}
                  >
                    {server.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Channel */}
            <div className="rounded-xl bg-card border border-border p-4">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">
                Channel
              </label>

              <select
                value={selectedChannelId}
                onChange={(e) =>
                  setSelectedChannelId(
                    e.target.value
                  )
                }
                disabled={!selectedServer}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground outline-none disabled:opacity-50"
              >
                <option value="">
                  Select a channel
                </option>

                {selectedServer?.channels.map(
                  (channel) => (
                    <option
                      key={channel.id}
                      value={channel.id}
                    >
                      #{channel.name}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* Command */}
          <div className="rounded-xl bg-card border border-border p-4">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">
              Command
            </label>

            <div className="flex gap-3">
              <input
                value={command}
                onChange={(e) =>
                  setCommand(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    executeCommand()
                  }
                }}
                placeholder="Enter command..."
                className="flex-1 h-12 px-4 rounded-lg bg-secondary border border-border text-foreground outline-none"
              />

              <button
                onClick={() =>
                  executeCommand()
                }
                disabled={
                  !command.trim()
                }
                className={cn(
                  "px-6 h-12 rounded-lg font-medium flex items-center gap-2 transition-colors",
                  command.trim()
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary text-muted-foreground cursor-not-allowed"
                )}
              >
                <Send className="w-4 h-4" />
                Execute
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-xl bg-card border border-border p-4">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">
              Quick Actions
            </label>

            <div className="grid grid-cols-3 gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon

                return (
                  <button
                    key={action.label}
                    onClick={() =>
                      executeCommand(
                        action.command
                      )
                    }
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary border border-border hover:border-primary/30 hover:bg-secondary/80 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-primary" />

                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">
                        {action.label}
                      </p>

                      <p className="text-xs text-muted-foreground font-mono">
                        {action.command}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* History */}
        <div className="rounded-xl bg-card border border-border flex flex-col">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <History className="w-4 h-4 text-muted-foreground" />

            <h3 className="text-sm font-medium text-foreground">
              Command History
            </h3>
          </div>

          <div className="flex-1 overflow-auto p-2">
            {history.length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                No commands yet
              </div>
            ) : (
              history.map((item, i) => (
                <button
                  key={i}
                  onClick={() =>
                    setCommand(item.command)
                  }
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-secondary/50 transition-colors text-left"
                >
                  <div>
                    <p className="text-sm font-mono text-foreground">
                      {item.command}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {item.time}
                    </p>
                  </div>

                  <span className="w-2 h-2 rounded-full bg-green-400" />
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}