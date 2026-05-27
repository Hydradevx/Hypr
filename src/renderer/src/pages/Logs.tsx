"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "../lib/utils"
import {
  Search,
  Trash2,
  Download,
  Pause,
  Play,
} from "lucide-react"

type LogLevel =
  | "info"
  | "success"
  | "warn"
  | "error"
  | "debug"

type LogEntry = {
  id: number
  timestamp: string
  level: LogLevel
  source: string
  message: string
}

function parseLog(log: string, index: number): LogEntry {
  const timestampMatch =
    log.match(/\[(.*?)\]/)

  const levelMatch =
    log.match(/\[(INFO|WARN|ERROR|DEBUG|SUCCESS)\]/i)

  const sourceMatch =
    log.match(/\[(SYSTEM|RPC|API|WS|CACHE|CMD|MODULE|PING|MEMORY)\]/i)

  const timestamp =
    timestampMatch?.[1] || "00:00:00"

  const level =
    (levelMatch?.[1]?.toLowerCase() as LogLevel) ||
    "info"

  const source =
    sourceMatch?.[1] || "SYSTEM"

  return {
    id: index,
    timestamp,
    level,
    source,
    message: log,
  }
}

export default function Logs() {
  const [logs, setLogs] = useState<
    LogEntry[]
  >([])

  const [filter, setFilter] =
    useState("")

  const [paused, setPaused] =
    useState(false)

  const scrollRef =
    useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (paused) return

    const fetchLogs = async () => {
      try {
        const data =
          await window.hypr.getLogs()

        if (!Array.isArray(data)) return

        const parsed = data.map(
          (
            log: string,
            index: number
          ) => parseLog(log, index)
        )

        setLogs(parsed)
      } catch (err) {
        console.error(err)
      }
    }

    fetchLogs()

    const interval =
      setInterval(fetchLogs, 1000)

    return () =>
      clearInterval(interval)
  }, [paused])

  useEffect(() => {
    if (!scrollRef.current || paused)
      return

    scrollRef.current.scrollTop =
      scrollRef.current.scrollHeight
  }, [logs, paused])

  const filteredLogs = logs.filter(
    (log) =>
      log.message
        .toLowerCase()
        .includes(filter.toLowerCase()) ||
      log.source
        .toLowerCase()
        .includes(filter.toLowerCase())
  )

  function getLevelStyles(
    level: LogLevel
  ) {
    switch (level) {
      case "success":
        return "text-green-400 bg-green-400/10"

      case "warn":
        return "text-yellow-400 bg-yellow-400/10"

      case "error":
        return "text-red-400 bg-red-400/10"

      case "debug":
        return "text-muted-foreground bg-secondary"

      default:
        return "text-blue-400 bg-blue-400/10"
    }
  }

  function downloadLogs() {
    const blob = new Blob(
      [logs.map((l) => l.message).join("\n")],
      {
        type: "text/plain",
      }
    )

    const url =
      URL.createObjectURL(blob)

    const a =
      document.createElement("a")

    a.href = url
    a.download = "hypr-logs.txt"
    a.click()

    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-card/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

          <input
            placeholder="Search logs..."
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            className="w-64 h-9 pl-9 pr-3 rounded-lg bg-secondary border border-border text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground mr-2">
            {filteredLogs.length} entries
          </span>

          <button
            onClick={() =>
              setPaused(!paused)
            }
            className={cn(
              "p-2 rounded-lg border transition-colors",
              paused
                ? "bg-green-400/10 border-green-400/30 text-green-400"
                : "bg-secondary border-border text-muted-foreground hover:text-foreground"
            )}
          >
            {paused ? (
              <Play className="w-4 h-4" />
            ) : (
              <Pause className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={() => setLogs([])}
            className="p-2 rounded-lg bg-secondary border border-border text-muted-foreground hover:text-foreground transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            onClick={downloadLogs}
            className="p-2 rounded-lg bg-secondary border border-border text-muted-foreground hover:text-foreground transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Logs */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto p-4 font-mono text-sm bg-background"
      >
        {filteredLogs.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No logs yet...
          </div>
        ) : (
          <div className="space-y-0.5">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-3 py-1.5 px-2 rounded hover:bg-secondary/30 transition-colors"
              >
                <span className="text-muted-foreground shrink-0 w-24 text-xs tabular-nums">
                  {log.timestamp}
                </span>

                <span
                  className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-medium shrink-0 w-16 text-center uppercase",
                    getLevelStyles(
                      log.level
                    )
                  )}
                >
                  {log.level}
                </span>

                <span className="text-muted-foreground shrink-0 w-20 text-xs font-medium">
                  [{log.source}]
                </span>

                <span className="text-foreground text-xs break-all">
                  {log.message}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}