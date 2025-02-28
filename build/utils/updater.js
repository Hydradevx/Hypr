"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = update;
const axios = require("axios");
const logger_1 = __importDefault(require("./logger"));
const inquirer_1 = __importDefault(require("inquirer"));
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function update() {
  try {
    const rawFileUrl =
      "https://raw.githubusercontent.com/Hydradevx/Hydrion-S3LFB0T/refs/heads/main/package.json";
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537",
    };
    const response = await axios.get(rawFileUrl, { headers });
    if (!response.data || !response.data.version) {
      logger_1.default.warn(
        "Failed to fetch latest version. Response is invalid.",
      );
      return;
    }
    const ghVersion = response.data.version;
    const packageJsonPath = path_1.default.join(
      __dirname,
      "../../package.json",
    );
    const packageJsonContent = fs_1.default.readFileSync(
      packageJsonPath,
      "utf-8",
    );
    const Json = JSON.parse(packageJsonContent);
    const version = Json.version;
    if (ghVersion > version) {
      logger_1.default.status(`New version available: ${ghVersion}`);
      logger_1.default.warn(
        "Please backup your config.json and install the latest version to continue using Hydrion!! Thank you",
      );
      const { update } = await inquirer_1.default.prompt([
        {
          type: "confirm",
          name: "update",
          message: `Do you want to update now? ( v${version} -> v${ghVersion})`,
        },
      ]);
      if (update) {
        logger_1.default.info("Updating...");
        try {
          (0, child_process_1.execSync)("git stash");
          (0, child_process_1.execSync)("git pull");
          (0, child_process_1.execSync)("git reset --hard");
          logger_1.default.info("Update successful!");
          restart();
        } catch (error) {
          logger_1.default.warn(`Update failed! (Code: ${error.status})`);
        }
      }
    } else {
      logger_1.default.info(`You are running the latest version: ${version}`);
    }
  } catch (error) {
    logger_1.default.warn(`Error checking for updates: ${error.message}`);
  }
}
function restart() {
  logger_1.default.info("Restarting...");
  const child = (0, child_process_1.spawn)("cmd.exe", ["/K", "npm start"], {
    cwd: process.cwd(),
    shell: true,
    detached: true,
    stdio: "ignore",
  });
  child.unref();
  process.exit(0);
}
