import os from "os"
import { client } from "../../bot"

let lastIdle = 0
let lastTotal = 0

function formatUptime(seconds: number) {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  return `${days}d ${hours}h ${mins}m ${secs}s`
}

function getCPUUsage() {
  const cpus = os.cpus()

  let idle = 0
  let total = 0

  for (const cpu of cpus) {
    for (const type in cpu.times) {
      total += cpu.times[type as keyof typeof cpu.times]
    }

    idle += cpu.times.idle
  }

  const idleDiff = idle - lastIdle
  const totalDiff = total - lastTotal

  lastIdle = idle
  lastTotal = total

  if (totalDiff === 0) return 0

  return Math.round(
    100 - (idleDiff / totalDiff) * 100
  )
}

export function getBotStats() {
  const usedMemory =
    process.memoryUsage().heapUsed / 1024 / 1024

  const totalMemory =
    process.memoryUsage().heapTotal / 1024 / 1024

  const ramUsage = Math.round(
    (usedMemory / totalMemory) * 100
  )

  const uptimeSeconds = process.uptime()

  return {
    username:
      client.user?.username || "Unknown",

    servers:
      client.guilds.cache.size,

    ping:
      Math.round(client.ws.ping || 0),

    uptime:
      formatUptime(uptimeSeconds),

    cpuUsage:
      getCPUUsage(),

    ramUsed:
      `${usedMemory.toFixed(1)} MB`,

    ramTotal:
      `${totalMemory.toFixed(1)} MB`,

    ramUsage,
  }
}