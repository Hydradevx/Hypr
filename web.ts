import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { client } from "./bot";
import logger from "./bot/utils/logger";
import fs from "fs/promises";

const CONFIG_PATH = path.resolve("config.json");

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
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

function formatUptime(ms: number = 0): string {
  const sec = Math.floor(ms / 1000);
  const hrs = Math.floor(sec / 3600);
  const min = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return `${hrs}h ${min}m ${s}s`;
}

export function startWebUI(PORT: number) {
  app.listen(PORT, () => {
    logger.info(`Server running at http://localhost:${PORT}`);
  });
}
