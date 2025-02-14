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
const updateChecker_1 = __importDefault(require("./utils/updateChecker"));
const logger_1 = require("./utils/logger");
const infoLog_1 = require("./utils/infoLog");
const usageLoader_1 = require("./utils/usageLoader");
const infoLoader_1 = require("./utils/infoLoader");
const afkState_1 = __importDefault(require("./managers/afkState"));
const richPresence_1 = __importDefault(require("./utils/richPresence"));
const child_process_1 = require("child_process");
const Json = require("../package.json");
let config;
const runConfigMakeScript = () => {
  return new Promise((resolve, reject) => {
    (0, child_process_1.exec)(
      "cd .. && node build/utils/configMake.js",
      (error, stdout, stderr) => {
        if (error) {
          reject(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          reject(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        resolve();
      },
    );
  });
};
const loadConfig = () => {
  if (!fs_1.default.existsSync("../config.json")) {
    runConfigMakeScript()
      .then(() => {
        console.log("Config file created successfully.");
        process.exit(0);
      })
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });
  } else {
    const configData = fs_1.default.readFileSync("../config.json", "utf-8");
    return (config = JSON.parse(configData));
  }
};
config = loadConfig();
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
  (0, richPresence_1.default)(client);
});
client.on("messageCreate", (message) => {
  if (config.hasAccess.includes(message.author.id)) {
    if (afkState_1.default.afkStatus && message.mentions.has(client.user)) {
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
let updated = (0, updateChecker_1.default)(Json);
if (updated) {
  checkConfig(client);
} else {
  (0, logger_1.warn)(
    "Please backup your config.json and install the latest version to continue using Hydrion!! Thank you",
  );
}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
sleep(30000);
async function checkConfig(client) {
  if (config) {
    if (fs_1.default.existsSync("../config.json")) {
      config = fs_1.default.readFileSync("../config.json");
    }
    client.login(config.token);
    startlogs();
  } else {
    setTimeout(checkConfig, 20000);
  }
}
function startlogs() {
  console.log(ansi_colors_1.default.gray("Initializing logs...\n"));
  (0, logger_1.initLogger)();
  if (isTermux()) {
    (0, logger_1.log)("Running on Termux");
  } else {
    (0, infoLog_1.logdeviceInfo)();
  }
}
const isTermux = () =>
  process.env.TERMUX_VERSION ||
  require("fs").existsSync("/data/data/com.termux/files/usr");
