import express from "express";
import path from "path";
import { client } from "./bot";
import logger from "./utils/logger";

const app = express();

app.set("views", path.join(__dirname, "../ui/views"));
app.set("view engine", "ejs");

app.get("/", (req, res) =>
  res.render("layout", { title: "Control Centre", body: "control" }),
);
app.get("/device", (req, res) =>
  res.render("layout", { title: "User's Device Stats", body: "device" }),
);
app.get("/selfbot", (req, res) =>
  res.render("layout", {
    title: "Selfbot Stats",
    body: "stats",
    stats: getBotStats(),
  }),
);
app.get("/info", (req, res) =>
  res.render("layout", { title: "Useful Links & Info", body: "info" }),
);

function getBotStats() {
  return {
    username: client.user?.username || "Unknown",
    servers: client.guilds.cache.size,
    ping: client.ws.ping,
    uptime: formatUptime(client.uptime || 0),
  };
}

function formatUptime(ms: number): string {
  let seconds = Math.floor(ms / 1000) % 60;
  let minutes = Math.floor(ms / (1000 * 60)) % 60;
  let hours = Math.floor(ms / (1000 * 60 * 60)) % 24;
  let days = Math.floor(ms / (1000 * 60 * 60 * 24));
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

export function startWebUI(port = 3000) {
  app.listen(port, () =>
    logger.info(`Web UI running at http://localhost:${port}`),
  );
}
