"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.startWebUI = startWebUI;
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const bot_1 = require("./bot");
const logger_1 = __importDefault(require("./utils/logger"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server);
app.set("views", path_1.default.join(__dirname, "../ui"));
app.set("view engine", "ejs");
app.use(
  express_1.default.static(path_1.default.join(__dirname, "../ui/public")),
);
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
    username: bot_1.client.user?.username || "Unknown",
    servers: bot_1.client.guilds.cache.size,
    ping: bot_1.client.ws.ping,
    uptime: formatUptime(bot_1.client.uptime || 0),
  };
}
function formatUptime(ms) {
  let seconds = Math.floor(ms / 1000) % 60;
  let minutes = Math.floor(ms / (1000 * 60)) % 60;
  let hours = Math.floor(ms / (1000 * 60 * 60)) % 24;
  let days = Math.floor(ms / (1000 * 60 * 60 * 24));
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
function startWebUI(port = 3000) {
  server.listen(port, () => {
    logger_1.default.status(`Web UI running at http://localhost:${port}`);
  });
}
