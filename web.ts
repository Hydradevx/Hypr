import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { client } from "./bot";
import logger from "./bot/utils/logger";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

export function startWebUI(PORT: number) {
  app.listen(PORT, () => {
    logger.info(`Server running at http://localhost:${PORT}`);
  });
}
