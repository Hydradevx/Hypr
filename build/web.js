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
const logger_1 = __importDefault(require("./utils/logger"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server);
app.set("views", path_1.default.join(__dirname, "../ui/views"));
app.set("view engine", "ejs");
app.use(
  express_1.default.static(path_1.default.join(__dirname, "../ui/public")),
);
app.get("/", (req, res) => res.render("index", { title: "Control Centre" }));
app.get("/device", (req, res) =>
  res.render("device", { title: "User's Device Stats" }),
);
app.get("/selfbot", (req, res) =>
  res.render("selfbot", { title: "Selfbot Stats" }),
);
app.get("/info", (req, res) =>
  res.render("info", { title: "Useful Links & Info" }),
);
function startWebUI(port = 3000) {
  app.listen(port, () => {
    logger_1.default.status(`Web UI running at http://localhost:${port}`);
  });
}
