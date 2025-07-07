import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { client } from "./bot.js";
import logger from "./bot/utils/logger.js";
import fs from "fs/promises";
import {
  setRichPresence,
  getCurrentRpc,
  RpcData,
} from "./bot/utils/richPresence.js";

const CONFIG_PATH = path.resolve("config.json");

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "web")));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "web/index.html"));
});

app.get("/api/config", async (_, res) => {
  try {
    const data = await fs.readFile(CONFIG_PATH, "utf-8");
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: "Failed to read config" });
  }
});

app.post("/api/config", async (req, res) => {
  try {
    await fs.writeFile(CONFIG_PATH, JSON.stringify(req.body, null, 2));
    res.json({ message: "Config saved." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save config" });
  }
});

app.get("/api/botStats", (_req, res) => {
  const stats = {
    username: client.user?.username || "Unknown",
    servers: client.guilds.cache.size,
    ping: client.ws.ping,
    uptime: formatUptime(client.uptime),
  };
  res.json(stats);
});

app.post("/api/kill", (_req, res) => {
  logger.warn("Selfbot kill requested from web UI");
  res.status(200).json({ message: "Selfbot shutting down..." });

  setTimeout(() => process.exit(0), 1000);
});

app.get("/api/logs", (_req, res) => {
  res.json({ logs: logger.getLogs() });
});

app.get("/api/servers", async (req, res) => {
  try {
    const servers = client.guilds.cache.map((guild: any) => {
      return {
        id: guild.id,
        name: guild.name,
        channels: guild.channels.cache
          .filter(
            (ch: any) =>
              (ch.type === "GUILD_TEXT" || ch.type === "GUILD_NEWS") &&
              ch.viewable &&
              ch.permissionsFor(guild.me)?.has("SEND_MESSAGES"),
          )
          .map((channel: any) => ({
            id: channel.id,
            name: channel.name,
          })),
      };
    });

    res.json(servers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch servers." });
  }
});

app.post("/api/sendCommand", async (req: any, res: any) => {
  const { channelId, content } = req.body;

  if (!channelId || !content) {
    return res.status(400).json({ message: "Missing channelId or content." });
  }

  try {
    const channel = await client.channels.fetch(channelId);

    if (!channel || !channel.send) {
      return res.status(400).json({ message: "Invalid channel." });
    }

    await channel.send(content);
    res.json({ message: "Command sent successfully." });
  } catch (error) {
    console.error("Error sending command:", error);
    res.status(500).json({ message: "Failed to send command." });
  }
});

app.post("/api/command", async (req, res) => {
  const { guildId, channelId, command } = req.body;

  try {
    const guild = client.guilds.cache.get(guildId);
    if (!guild) throw new Error("Guild not found");

    const channel = guild.channels.cache.get(channelId);
    if (!channel || !channel.isTextBased())
      throw new Error("Channel not found or not text-based");

    await (channel as any).send(command);
    res.json({ success: true, message: "Command sent" });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

const PRESETS_PATH = path.resolve("rpc-presets.json");

async function loadPresets(): Promise<Record<string, RpcData>> {
  try {
    const data = await fs.readFile(PRESETS_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function savePresets(presets: Record<string, RpcData>) {
  await fs.writeFile(PRESETS_PATH, JSON.stringify(presets, null, 2));
}

app.get("/api/rpc/current", (_req, res) => {
  res.json(getCurrentRpc());
});

app.post("/api/rpc/update", (req, res) => {
  try {
    setRichPresence(client, req.body);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

app.get("/api/rpc/presets", async (_req, res) => {
  const presets = await loadPresets();
  res.json(presets);
});

app.post("/api/rpc/presets/save", async (req: any, res: any) => {
  const { name, data } = req.body;
  if (!name || !data)
    return res
      .status(400)
      .json({ success: false, message: "Missing name or data." });

  const presets = await loadPresets();
  presets[name] = data;
  await savePresets(presets);
  res.json({ success: true });
});

app.post("/api/rpc/presets/load", async (req: any, res: any) => {
  const { name } = req.body;
  const presets = await loadPresets();
  const preset = presets[name];
  if (!preset)
    return res
      .status(404)
      .json({ success: false, message: "Preset not found." });

  try {
    setRichPresence(client, preset);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

function formatUptime(ms: number = 0): string {
  const sec = Math.floor(ms / 1000);
  const hrs = Math.floor(sec / 3600);
  const min = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return `${hrs}h ${min}m ${s}s`;
}

let PORT = 3000;

export function startWebUI() {
  app.listen(PORT, () => {
    logger.info(`Server running at http://localhost:${PORT}`);
  });
}
