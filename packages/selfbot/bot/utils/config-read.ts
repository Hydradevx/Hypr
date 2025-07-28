import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk"

type Config = {
  token: string;
  prefix: string;
  safetyTime: number;
  WebUI: boolean;
  rpc: boolean;
  autoreact: boolean;
  hasAccess: any;
};
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.join(__dirname, "../../../config.json");
if (!fs.existsSync(configPath)) {
  console.log(
    `Please type ${chalk.red("npm run config")} to set up the config!`,
  );
  process.exit();
}
let config: Config = JSON.parse(fs.readFileSync(configPath, "utf-8"));


if (!config.hasAccess) {
  config.hasAccess = [];
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

fs.watch(configPath, (eventType) => {
  if (eventType === "change") {
    try {
      const newConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));
      config = { ...config, ...newConfig };
      console.log("[CONFIG] 🔁 Reloaded config.json");
    } catch (err) {
      console.error("[CONFIG] ❌ Failed to reload config.json", err);
    }
  }
});

export const getConfig = (): Config => config;
