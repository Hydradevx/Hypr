import { ipcMain } from "electron";
import fs from "fs/promises";
import path from "path";

import { client } from "./bot.ts";
import logger from "./bot/utils/logger.ts";

import {
  setRichPresence,
  getCurrentRpc
} from "./bot/utils/richPresence.ts";
import { configCreate, ConfigType, doesConfigExists } from "./bot/utils/config-read.ts";
import { getBotStats } from "./bot/utils/botStats.ts";

const CONFIG_PATH = path.resolve("config.json");

function formatUptime(ms: number = 0): string {
  const sec = Math.floor(ms / 1000);
  const hrs = Math.floor(sec / 3600);
  const min = Math.floor((sec % 3600) / 60);
  const s = sec % 60;

  return `${hrs}h ${min}m ${s}s`;
}

export function setupIPC() {

  ipcMain.handle("config:get", async () => {
    const data = await fs.readFile(CONFIG_PATH, "utf-8");
    return JSON.parse(data);
  });

  ipcMain.handle("config:set", async (_, newConfig) => {
    await fs.writeFile(
      CONFIG_PATH,
      JSON.stringify(newConfig, null, 2)
    );

    return true;
  });

  ipcMain.handle("config:exists", async () => {
    return doesConfigExists();
  });

  ipcMain.handle("config:create", async (_, data: ConfigType) => {
    await configCreate(data);
  });

  ipcMain.handle("bot:stats", () => {
    return getBotStats();
  });

  ipcMain.handle("bot:logs", () => {
    return logger.getLogs();
  });

  ipcMain.handle("bot:kill", () => {
    logger.warn("Kill requested from UI");

    setTimeout(() => {
      process.exit(0);
    }, 1000);

    return true;
  });

  ipcMain.handle("rpc:get", () => {
    return getCurrentRpc();
  });

  ipcMain.handle("rpc:set", (_, data) => {
    setRichPresence(client, data);
    return true;
  });

  ipcMain.handle(
      "sendCommand",
    async (_, data) => {
      const { channelId, content } = data;

      const channel =
        await client.channels.fetch(channelId);

      if (!channel || !("send" in channel)) {
        throw new Error("Invalid channel");
      }

      await (channel as any).send(content);

      return {
        success: true,
        message: "Command sent successfully",
      };
    },
  );

  ipcMain.handle("getServers", async () => {
    const servers = client.guilds.cache.map((guild) => ({
      id: guild.id,
      name: guild.name,
      channels: guild.channels.cache
        .filter(
          (ch: any) =>
            ch.type === "GUILD_TEXT" ||
            ch.type === "GUILD_NEWS"
        )
        .map((ch) => ({
          id: ch.id,
          name: ch.name,
        })),
    }));
    return servers;
  });
}