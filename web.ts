import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import cors from "cors";
import { client } from "./bot/bot";
import logger from "./bot/utils/logger";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const buildReactApp = () => {
  logger.info("Building React app...");
  try {
    execSync("bun vite build", {
      cwd: path.join(__dirname, "./"),
      stdio: "inherit",
    });
    logger.info("React app built successfully.");
  } catch (error) {
    logger.error("Error building React app");
    process.exit(1);
  }
};

const buildPath = path.join(__dirname, "./dist");
app.use(express.static(buildPath));

app.get("/api/botStats", (req, res) => {
  res.json(getBotStats());
});

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

function getBotStats() {
  return {
    username: client.user?.username || "Unknown",
    servers: client.guilds.cache.size,
    ping: client.ws.ping,
    uptime: formatUptime(client.uptime || 0),
  };
}

function formatUptime(ms: number): string {
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const hours = Math.floor(ms / (1000 * 60 * 60)) % 24;
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

export function startWebUI(port = 3000) {
  buildReactApp();
  app.listen(port, () =>
    logger.info(`Web UI running at http://localhost:${port}`)
  );
}