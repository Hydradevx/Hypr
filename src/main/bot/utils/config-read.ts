import fs from "fs";
import path from "path";
import os from "os";
import chalk from "chalk";

type Config = {
  token: string;
  prefix: string;
  safetyTime: number;
  WebUI: boolean;
  rpc: boolean;
  autoreact: boolean;
  hasAccess: string[];
};

const isDev = process.env.NODE_ENV === "development";

const configDir = isDev
  ? process.cwd()
  : path.join(os.homedir(), ".config", "hypr");

if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true });
}

const configPath = isDev
  ? path.join(configDir, "config.json")
  : path.join(configDir, "config.json");

if (!fs.existsSync(configPath)) {
  console.log(
    `Please type ${chalk.red(
      "npm run config"
    )} to set up the config!`
  );

  process.exit(1);
}

const config: Config = JSON.parse(
  fs.readFileSync(configPath, "utf-8")
);

if (!config.hasAccess) {
  config.hasAccess = [];
}

export const getConfig = (): Config => config;

export { configPath };
