"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.startWebUI = startWebUI;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const bot_1 = require("./bot");
const logger_1 = __importDefault(require("./utils/logger"));
const app = (0, express_1.default)();
app.set("views", path_1.default.join(__dirname, "../ui/views"));
app.set("view engine", "ejs");
app.use(
  express_1.default.static(path_1.default.join(__dirname, "../ui/public")),
);
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
  app.listen(port, () =>
    logger_1.default.info(`Web UI running at http://localhost:${port}`),
  );
}
