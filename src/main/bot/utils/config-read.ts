import fs from "fs";
import path from "path";
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

const configPath = path.resolve("config.json");

if (!fs.existsSync(configPath)) {
  console.log(
    `Please type ${chalk.red("npm run config")} to set up the config!`
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