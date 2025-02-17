"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const discord_js_selfbot_v13_1 = require("discord.js-selfbot-v13");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ansi_colors_1 = __importDefault(require("ansi-colors"));
const updater_1 = __importDefault(require("./utils/updater"));
const logger_1 = __importDefault(require("./utils/logger"));
const usageLoader_1 = require("./utils/usageLoader");
const infoLoader_1 = require("./utils/infoLoader");
const afkState_1 = __importDefault(require("./managers/afkState"));
const richPresence_1 = __importDefault(require("./utils/richPresence"));
let config;
const configPath = path_1.default.join(__dirname, "../config.json");
if (!fs_1.default.existsSync(configPath)) {
  console.log(
    `Please type ${ansi_colors_1.default.red("npm run config")} to set up the config!`,
  );
  process.exit();
}
config = JSON.parse(fs_1.default.readFileSync(configPath, "utf-8"));
exports.client = new discord_js_selfbot_v13_1.Client();
const token = config.token;
let prefix = config.prefix;
exports.client.commands = new discord_js_selfbot_v13_1.Collection();
function getFilesRecursively(directory) {
  let files = [];
  const items = fs_1.default.readdirSync(directory, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path_1.default.join(directory, item.name);
    if (item.isDirectory()) {
      files = files.concat(getFilesRecursively(fullPath));
    } else if (item.isFile() && fullPath.endsWith(".js")) {
      files.push(fullPath);
    }
  }
  return files;
}
const commandsPath = path_1.default.join(__dirname, "commands");
const commandFiles = getFilesRecursively(commandsPath);
for (const filePath of commandFiles) {
  const command = require(filePath);
  if (command.name) {
    exports.client.commands.set(command.name, command);
    if (command.aliases) {
      command.aliases.forEach((alias) => {
        exports.client.commands.set(alias, command);
      });
    }
  }
}
exports.client.on("ready", async () => {
  logger_1.default.status(`Logged in as ${exports.client.user?.tag}`);
  config.hasAccess.push(exports.client.user?.id);
  (0, richPresence_1.default)(exports.client);
});
exports.client.on("messageCreate", (message) => {
  if (config.hasAccess.includes(message.author.id)) {
    if (
      afkState_1.default.afkStatus &&
      message.mentions.has(exports.client.user)
    ) {
      message.reply(
        `💤 I'm currently AFK. Reason: ${afkState_1.default.afkReason}`,
      );
      return;
    }
  }
  if (
    message.author.bot ||
    !message.content.startsWith(prefix) ||
    !config.hasAccess.includes(message.author.id)
  )
    return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift()?.toLowerCase();
  const command = exports.client.commands.get(commandName);
  if (!command) return;
  if (args[0] === "--usage") {
    (0, usageLoader_1.usageLoad)(command, message, prefix);
    return;
  }
  if (args[0] === "--info") {
    (0, infoLoader_1.infoLoad)(command, message);
    return;
  }
  message.prefix = prefix;
  message.isOwnMessage = message.author.id === message.client.user?.id;
  message.sendMessage =
    message.author.id === message.client.user?.id
      ? message.channel.send.bind(message)
      : message.reply.bind(message);
  message.hasAccess = config.hasAccess;
  command.execute(message, args, exports.client, prefix);
});
let client_info = {
  raidsEnabled: false,
  moreCmdSoonMessage: "✨ **More Commands Coming Soon!** ✨",
};
exports.client.info = client_info;
(0, updater_1.default)();
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
sleep(100);
exports.client.login(token);
startlogs();
function startlogs() {
  console.log(ansi_colors_1.default.gray("Initializing logs...\n"));
  logger_1.default.initLogger();
}
