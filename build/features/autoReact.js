"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAutoReact = setupAutoReact;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const configPath = path_1.default.join(__dirname, "./autoReactConfig.json");
let autoReactConfig = {};
function loadConfig() {
  try {
    autoReactConfig = JSON.parse(fs_1.default.readFileSync(configPath, "utf8"));
  } catch {}
}
function setupAutoReact(client) {
  loadConfig();
  client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.guild) return;
    for (const trigger in autoReactConfig) {
      if (message.content.toLowerCase().includes(trigger)) {
        for (const emoji of autoReactConfig[trigger]) {
          await message.react(emoji).catch(() => {});
        }
        break;
      }
    }
  });
}
