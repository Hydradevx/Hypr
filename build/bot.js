import { Client, Collection } from "discord.js-selfbot-v13";
import fs from "fs";
import path from "path";
import colors from "ansi-colors";
import update from "./utils/updater";
import logger from "./utils/logger";
import { logdeviceInfo } from "./utils/infoLog";
import { usageLoad } from "./utils/usageLoader";
import { infoLoad } from "./utils/infoLoader";
import afkState from "./managers/afkState";
import rpc from "./utils/richPresence";
import { exec } from "child_process";
const Json = require("../package.json");
let config;
const runConfigMakeScript = () => {
  return new Promise((resolve, reject) => {
    exec("cd .. && node build/utils/configMake.js", (error, stdout, stderr) => {
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
    });
  });
};
const loadConfig = () => {
  if (!fs.existsSync("../config.json")) {
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
    const configData = fs.readFileSync("../config.json", "utf-8");
    return (config = JSON.parse(configData));
  }
};
config = loadConfig();
const client = new Client();
const token = config.token;
let prefix = config.prefix;
client.commands = new Collection();
function getFilesRecursively(directory) {
  let files = [];
  const items = fs.readdirSync(directory, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(directory, item.name);
    if (item.isDirectory()) {
      files = files.concat(getFilesRecursively(fullPath));
    } else if (item.isFile() && fullPath.endsWith(".js")) {
      files.push(fullPath);
    }
  }
  return files;
}
const commandsPath = path.join(__dirname, "commands");
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
  logger.status(`Logged in as ${client.user?.tag}`);
  config.hasAccess.push(client.user?.id);
  rpc(client);
});
client.on("messageCreate", (message) => {
  if (config.hasAccess.includes(message.author.id)) {
    if (afkState.afkStatus && message.mentions.has(client.user)) {
      message.reply(`💤 I'm currently AFK. Reason: ${afkState.afkReason}`);
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
    usageLoad(command, message, prefix);
    return;
  }
  if (args[0] === "--info") {
    infoLoad(command, message);
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
update();
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
sleep(30000);
async function checkConfig(client) {
  if (config) {
    if (fs.existsSync("../config.json")) {
      config = fs.readFileSync("../config.json");
    }
    client.login(config.token);
    startlogs();
  } else {
    setTimeout(checkConfig, 20000);
  }
}
function startlogs() {
  console.log(colors.gray("Initializing logs...\n"));
  logger.initLogger();
  if (isTermux()) {
    logger.status("Running on Termux");
  } else {
    logdeviceInfo();
  }
}
const isTermux = () =>
  process.env.TERMUX_VERSION ||
  require("fs").existsSync("/data/data/com.termux/files/usr");
