import path from "path";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { client } from "./bot";
import logger from "./utils/logger";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.set("views", path.join(__dirname, "../ui/views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "../ui/public")));

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

export function startWebUI(port: number = 3000) {
  app.listen(port, () => {
    logger.status(`Web UI running at http://localhost:${port}`);
  });
}
