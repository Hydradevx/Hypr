import { Client, Collection } from "discord.js-selfbot-v13";
import fs from "fs";
import path from "path";
import colors from "ansi-colors";
import update from "./utils/updater";
import logger from "./utils/logger";
import { usageLoad } from "./utils/usageLoader";
import { infoLoad } from "./utils/infoLoader";
import afkState from "./managers/afkState";
import rpc from "./utils/richPresence";
import { setupAutoReact } from "./features/autoReact";

let config: any;
const configPath = path.join(__dirname, "../config.json");

config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
export const client: any = new Client();

const token = config.token;
const prefix: string = config.prefix || "!";
const safetyTime = config.safetyTime * 1000 || 60000 * 5;

export function initBot() {

if (!fs.existsSync(configPath)) {
  console.log(
    `Please type ${colors.red("bun run config")} to set up the config!`,
  );
  process.exit();
}



client.commands = new Collection();

if (!config.hasAccess) {
  config.hasAccess = [];
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

function getFilesRecursively(directory: string): string[] {
  let files: string[] = [];

  const items = fs.readdirSync(directory, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(directory, item.name);
    if (item.isDirectory()) {
      files.push(...getFilesRecursively(fullPath));
    } else if (item.isFile() && path.extname(fullPath) === ".js") {
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

    if (command.aliases && Array.isArray(command.aliases)) {
      command.aliases.forEach((alias: string) =>
        client.commands.set(alias, command),
      );
    }
  }
}

client.on("ready", async () => {
  logger.status(`Logged in as ${client.user?.tag}`);
  rpc(client);
});

client.on("messageCreate", (message: any) => {
  if (!config.hasAccess.includes(message.author.id)) {
    if (afkState.afkStatus && message.mentions.has(client.user!)) {
      message.reply(`💤 I'm currently AFK. Reason: ${afkState.afkReason}`);
      return;
    }
  }

  if (
    message.author.bot ||
    !message.content.startsWith(prefix) ||
    (!config.hasAccess.includes(message.author.id) &&
      message.author.id !== client.user?.id)
  )
    return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift()?.toLowerCase();
  const command = client.commands.get(commandName!);

  if (!command) return;

  if (message.author.id !== client.user?.id) return;

  const originalSend = message.channel.send.bind(message.channel);

  message.channel.send = async (...args: any[]) => {
    const sentMessage = await originalSend(...args);
    if (sentMessage) {
      setTimeout(() => {
        if (sentMessage.deletable) sentMessage.delete().catch(() => {});
      }, safetyTime);
    }
  };

  setTimeout(() => {
    if (message.deletable) message.delete().catch(() => {});
  }, safetyTime);

  if (args[0] === "--usage") {
    usageLoad(command, message, prefix);
    return;
  }

  if (args[0] === "--info") {
    infoLoad(command, message);
    return;
  }

  command.execute(message, args, client, prefix);
});

let client_info = {
  raidsEnabled: false,
  moreCmdSoonMessage: "✨ **More Commands Coming Soon!** ✨",
};

client.info = client_info;

update();

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

sleep(100);

setupAutoReact(client);
client.login(token);

startlogs();

function startlogs() {
  console.log(colors.gray("Initializing logs...\n"));
  logger.initLogger();
}

}