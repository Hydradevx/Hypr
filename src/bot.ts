import { Client, Collection } from "discord.js-selfbot-v13";
import fs from "fs";
import path from "path";
import colors from "ansi-colors";
import { checkUpdate } from "./utils/updateChecker";
import { initLogger, log, warn, logStatus } from "./utils/logger";
import { logdeviceInfo } from "./utils/infoLog";
import { usageLoad } from "./utils/usageLoader";
import { infoLoad } from "./utils/infoLoader";
import { afkState } from "./managers/afkState";
import { rpc } from "./utils/richPresence";

const Json = require("./package.json");

const devConfigPath = "./devconfig/config.json";
const regularConfigPath = "./config.json";

let config: { [key: string]: any };

if (fs.existsSync(path.dirname(devConfigPath))) {
  config = JSON.parse(fs.readFileSync(devConfigPath, "utf-8"));
  logStatus("Using dev config.");
} else {
  config = JSON.parse(fs.readFileSync(regularConfigPath, "utf-8"));
  require("./utils/antiCrash")();
}

if (!config.hasAccess) config.hasAccess = [];

const client: any = new Client();

const token = config.token;
let prefix = config.prefix;

client.commands = new Collection();

function getFilesRecursively(directory: string): string[] {
  let files: string[] = [];

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
      command.aliases.forEach((alias: string) => {
        client.commands.set(alias, command);
      });
    }
  }
}

client.on("ready", async () => {
  logStatus(`Logged in as ${client.user?.tag}`);
  config.hasAccess.push(client.user?.id);
  rpc(client);
});

client.on("messageCreate", (message: any) => {
  if (config.hasAccess.includes(message.author.id)) {
    if (afkState.afkStatus && message.mentions.has(client.user!)) {
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
  const command = client.commands.get(commandName!);

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

let updated = checkUpdate(Json);
if (updated) {
  client.login(token);
} else {
  warn(
    "Please backup your config.json and install the latest version to continue using Hydrion!! Thank you",
  );
}

function startlogs() {
  console.log(colors.gray("Initializing logs...\n"));
  initLogger();
}

const isTermux = () =>
  process.env.TERMUX_VERSION ||
  require("fs").existsSync("/data/data/com.termux/files/usr");

if (isTermux()) {
  log("Running on Termux");
} else {
  logdeviceInfo();
}

startlogs();
