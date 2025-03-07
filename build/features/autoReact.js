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
const autoReactState_1 = __importDefault(require("../managers/autoReactState"));
const configPath = path_1.default.join(__dirname, "../../autoReact.json");
let autoReactConfig = {};
function loadConfig() {
  try {
    autoReactConfig = JSON.parse(fs_1.default.readFileSync(configPath, "utf8"));
  } catch (error) {
    console.error("Failed to load autoReactConfig:", error);
  }
}
function setupAutoReact(client) {
  loadConfig();
  client.on("messageCreate", (message) => {
    if (
      message.author.bot ||
      !message.guild ||
      !autoReactState_1.default.getStatus()
    )
      return;
    const words = message.content.toLowerCase().split(/\s+/);
    const reactions = new Set();
    for (const word of words) {
      if (autoReactConfig[word]) {
        reactions.add(autoReactConfig[word]);
      }
    }
    reactions.forEach(async (reaction) => {
      try {
        await message.react(reaction);
      } catch {}
    });
  });
}
