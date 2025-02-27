import path from "path";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { client } from "./bot";
import logger from "./utils/logger";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.set("views", path.join(__dirname, "../ui"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "../ui/public")));

app.get("/", (req, res) => {
  res.render("index", { stats: getBotStats() });
});

io.on("connection", (socket) => {
  socket.emit("stats", getBotStats());

  setInterval(() => {
    socket.emit("stats", getBotStats());
  }, 5000);
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
  let seconds = Math.floor(ms / 1000) % 60;
  let minutes = Math.floor(ms / (1000 * 60)) % 60;
  let hours = Math.floor(ms / (1000 * 60 * 60)) % 24;
  let days = Math.floor(ms / (1000 * 60 * 60 * 24));
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

export function startWebUI(port: number = 3000) {
  server.listen(port, () => {
    logger.status(`Web UI running at http://localhost:${port}`);
  });
}
