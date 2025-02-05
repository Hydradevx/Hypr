"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_selfbot_v13_1 = require("discord.js-selfbot-v13");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ansi_colors_1 = __importDefault(require("ansi-colors"));
const updateChecker_1 = require("./utils/updateChecker");
const logger_1 = require("./utils/logger");
const infoLog_1 = require("./utils/infoLog");
const usageLoader_1 = require("./utils/usageLoader");
const infoLoader_1 = require("./utils/infoLoader");
const afkState_1 = require("./managers/afkState");
const richPresence_1 = require("./utils/richPresence");
const Json = require("./package.json");
const devConfigPath = "./devconfig/config.json";
const regularConfigPath = "./config.json";
let config;
if (fs_1.default.existsSync(path_1.default.dirname(devConfigPath))) {
  config = JSON.parse(fs_1.default.readFileSync(devConfigPath, "utf-8"));
  (0, logger_1.logStatus)("Using dev config.");
} else {
  config = JSON.parse(fs_1.default.readFileSync(regularConfigPath, "utf-8"));
  require("./utils/antiCrash")();
}
if (!config.hasAccess) config.hasAccess = [];
const client = new discord_js_selfbot_v13_1.Client();
const token = config.token;
let prefix = config.prefix;
client.commands = new discord_js_selfbot_v13_1.Collection();
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
    client.commands.set(command.name, command);
    if (command.aliases) {
      command.aliases.forEach((alias) => {
        client.commands.set(alias, command);
      });
    }
  }
}
client.on("ready", async () => {
  (0, logger_1.logStatus)(`Logged in as ${client.user?.tag}`);
  config.hasAccess.push(client.user?.id);
  (0, richPresence_1.rpc)(client);
});
client.on("messageCreate", (message) => {
  if (config.hasAccess.includes(message.author.id)) {
    if (afkState_1.afkState.afkStatus && message.mentions.has(client.user)) {
      message.reply(
        `💤 I'm currently AFK. Reason: ${afkState_1.afkState.afkReason}`,
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
  const command = client.commands.get(commandName);
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
  command.execute(message, args, client);
});
let client_info = {
  raidsEnabled: false,
  moreCmdSoonMessage: "✨ **More Commands Coming Soon!** ✨",
};
client.info = client_info;
let updated = (0, updateChecker_1.checkUpdate)(Json);
if (updated) {
  client.login(token);
} else {
  (0, logger_1.warn)(
    "Please backup your config.json and install the latest version to continue using Hydrion!! Thank you",
  );
}
function startlogs() {
  console.log(ansi_colors_1.default.gray("Initializing logs...\n"));
  (0, logger_1.initLogger)();
}
const isTermux = () =>
  process.env.TERMUX_VERSION ||
  require("fs").existsSync("/data/data/com.termux/files/usr");
if (isTermux()) {
  (0, logger_1.log)("Running on Termux");
} else {
  (0, infoLog_1.logdeviceInfo)();
}
startlogs();
