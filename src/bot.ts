import { Client, Collection } from "discord.js-selfbot-v13";
import fs from "fs";
import path from "path";
import colors from "ansi-colors";
import checkUpdate from "./utils/updateChecker";
import { initLogger, log, warn, logStatus } from "./utils/logger";
import { logdeviceInfo } from "./utils/infoLog";
import { usageLoad } from "./utils/usageLoader";
import { infoLoad } from "./utils/infoLoader";
import afkState from "./managers/afkState";
import rpc from "./utils/richPresence";
import { exec } from "child_process";

const Json = require("../package.json");

let config: any;

const runConfigMakeScript = (): Promise<void> => {
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

const loadConfig = (): void => {
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
  checkConfig(client);
} else {
  warn(
    "Please backup your config.json and install the latest version to continue using Hydrion!! Thank you",
  );
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

sleep(30000);

async function checkConfig(client: any) {
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
  initLogger();
  if (isTermux()) {
    log("Running on Termux");
  } else {
    logdeviceInfo();
  }
}

const isTermux = () =>
  process.env.TERMUX_VERSION ||
  require("fs").existsSync("/data/data/com.termux/files/usr");
