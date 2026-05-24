"use client"

import {
  Activity,
  Server,
  ArrowUpRight,
  Clock,
  Cpu,
  HardDrive,
  Wifi,
} from "lucide-react"

import { cn } from "../lib/utils"
import { useEffect, useState } from "react"

type BotStats = {
  username: string
  servers: number
  ping: number
  uptime: string

  cpuUsage: number

  ramUsage: number
  ramUsed: string
  ramTotal: string
}

export default function Dashboard() {
  const [stats, setStats] =
    useState<BotStats | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data: BotStats =
          await window.hypr.getBotStats()

        setStats(data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchStats()

    const interval =
      setInterval(fetchStats, 1000)

    return () => clearInterval(interval)
  }, [])

  const statsData = stats
    ? [
        {
          label: "Username",
          value: stats.username,
          change: `${stats.ping}ms`,
          trend: "up",
          icon: Activity,
        },
        {
          label: "Servers",
          value: stats.servers,
          change: "+0",
          trend: "up",
          icon: Server,
        },
        {
          label: "Ping",
          value: `${stats.ping}ms`,
          change: "Realtime",
          trend: "up",
          icon: Wifi,
        },
        {
          label: "Uptime",
          value: stats.uptime,
          change: "Running",
          trend: "neutral",
          icon: Clock,
        },
      ]
    : []

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        {statsData.map((stat) => {
          const Icon = stat.icon

          return (
            <div
              key={stat.label}
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-secondary">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </div>

                <div
                  className={cn(
                    "flex items-center gap-1 text-xs font-medium",
                    stat.trend === "up"
                      ? "text-success"
                      : "text-muted-foreground"
                  )}
                >
                  {stat.trend === "up" && (
                    <ArrowUpRight className="w-3 h-3" />
                  )}

                  {stat.change}
                </div>
              </div>

              <p className="text-2xl font-semibold text-foreground tracking-tight">
                {stat.value}
              </p>

              <p className="text-xs text-muted-foreground mt-1">
                {stat.label}
              </p>
            </div>
          )
        })}
      </div>

      {/* System Status */}
      <div className="rounded-xl bg-card border border-border">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="text-base font-semibold text-foreground">
            System Status
          </h3>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

            <span className="text-sm text-green-400 font-medium">
              All Systems Operational
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-8">
            {/* CPU */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-secondary">
                    <Cpu className="w-5 h-5 text-muted-foreground" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground">
                      CPU Usage
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Live processor usage
                    </p>
                  </div>
                </div>

                <span className="text-2xl font-semibold text-foreground">
                  {stats?.cpuUsage ?? 0}%
                </span>
              </div>

              <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{
                    width: `${stats?.cpuUsage ?? 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Memory */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-secondary">
                    <HardDrive className="w-5 h-5 text-muted-foreground" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Memory
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {stats?.ramUsed ?? "0 GB"} /{" "}
                      {stats?.ramTotal ?? "0 GB"}
                    </p>
                  </div>
                </div>

                <span className="text-2xl font-semibold text-foreground">
                  {stats?.ramUsage ?? 0}%
                </span>
              </div>

              <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{
                    width: `${stats?.ramUsage ?? 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Network */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-secondary">
                    <Wifi className="w-5 h-5 text-muted-foreground" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Network
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Latency: {stats?.ping ?? 0}ms
                    </p>
                  </div>
                </div>

                <span className="text-2xl font-semibold text-green-400">
                  Online
                </span>
              </div>

              <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
                <div className="h-full w-[95%] bg-green-400 rounded-full transition-all duration-500" />
              </div>
            </div>

            {/* Uptime */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-secondary">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Runtime
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Since last restart
                    </p>
                  </div>
                </div>

                <span className="text-2xl font-semibold text-foreground">
                  {stats?.uptime ?? "0s"}
                </span>
              </div>

              <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
                <div className="h-full w-[100%] bg-primary rounded-full transition-all duration-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}