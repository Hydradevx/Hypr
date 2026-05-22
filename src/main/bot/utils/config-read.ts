import fs from "fs";
import path from "path";
import os from "os";

type ConfigType = {
  token: string;
  prefix: string;
  safetyTime: number;
  rpc: boolean;
  autoreact: boolean;
  hasAccess: string[];
};

const isDev =
  process.env.NODE_ENV === "development";

const configDir = isDev
  ? process.cwd()
  : path.join(os.homedir(), ".config", "hypr");

if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, {
    recursive: true,
  });
}

const configPath = path.join(
  configDir,
  "config.json"
);

function doesConfigExists() {
  return fs.existsSync(configPath);
}

function configCreate(data: ConfigType) {
  fs.writeFileSync(
    configPath,
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}

function getConfig(): ConfigType {
  if (!doesConfigExists()) {
    throw new Error(
      "Config file does not exist"
    );
  }

  const config: ConfigType = JSON.parse(
    fs.readFileSync(configPath, "utf-8")
  );

  if (!config.hasAccess) {
    config.hasAccess = [];
  }

  return config;
}

export {
  configPath,
  doesConfigExists,
  configCreate,
  getConfig,
};

export type { ConfigType };