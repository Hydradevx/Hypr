import { Client, Collection } from "discord.js-selfbot-v13";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import update from "./bot/utils/updater.ts";
import logger from "./bot/utils/logger.ts";
import { usageLoad } from "./bot/utils/usageLoader.ts";
import { infoLoad } from "./bot/utils/infoLoader.ts";
import afkState from "./bot/managers/afkState.ts";
import { setRichPresence } from "./bot/utils/richPresence.ts";
// import { startWebUI } from "./web.ts";
import { setupAutoReact } from "./bot/features/autoReact.ts";
import { antiCrash } from "./bot/utils/antiCrash.ts";
import { equipInvisibilityCloak } from "./bot/features/invisibilityCloak.ts";
import { pathToFileURL } from "url";
import { getConfig } from "./bot/utils/config-read.ts"


let config = getConfig();
export const client: any = new Client();

const token = config.token;
const prefix: string = config.prefix || "!";
const safetyTime = config.safetyTime * 1000 || 60000 * 5;

client.commands = new Collection();

const commandsPath = path.resolve(
  "src/main/bot/commands"
);

function getFilesRecursively(directory: string): string[] {
  let files: string[] = [];

  const items = fs.readdirSync(directory, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(directory, item.name);

    if (item.isDirectory()) {
      files.push(...getFilesRecursively(fullPath));
    } else if (
  item.isFile() &&
  (
    (fullPath.endsWith(".ts") &&
      !fullPath.endsWith(".d.ts")) ||
    fullPath.endsWith(".js")
  )
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

logger.info(commandsPath);

const commandFiles = getFilesRecursively(commandsPath);

logger.info(commandFiles.toString());

async function loadCommands() {
  for (const filePath of commandFiles) {
    try {
      console.log("Loading command:", filePath);

      const commandModule = await import(
        pathToFileURL(filePath).href
      );

      const command =
        commandModule.default || commandModule;

      console.log("Loaded command:", command?.name);

      if (command?.name) {
        client.commands.set(command.name, command);

        if (Array.isArray(command.aliases)) {
          command.aliases.forEach((alias: string) => {
            client.commands.set(alias, command);
          });
        }
      }
    } catch (err) {
      console.error("Failed loading:", filePath);
      console.error(err);
    }
  }
}

client.on("ready", async () => {
  logger.status(`Logged in as ${client.user?.tag}`);
  if(config.rpc) {
    setRichPresence(client);
  }
  logger.status("Prefix is" + chalk.cyan(` ${prefix}`));
  equipInvisibilityCloak(client);
});

client.on("messageCreate", async (message: any) => {
  let isReply = false;

  if (message.reference?.messageId) {
    try {
      const repliedMessage = await message.fetchReference();

      if (repliedMessage?.author?.id === client.user?.id) {
        isReply = true;
      }
    } catch {}
  }

  const isMentioned = message.mentions.has(client.user!);

  if (
    afkState.getAfkStatus() &&
    message.author.id !== client.user?.id &&
    (isMentioned || isReply)
  ) {
    message.reply(
      `💤 I'm currently AFK. Reason: ${afkState.getAfkReason()}`
    );

    return;
  }

  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift()?.toLowerCase();
  const command = client.commands.get(commandName);

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

//update();

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

sleep(100);

async function startBot() {
  await loadCommands();

  logger.info(
    `Loaded ${client.commands.size} commands`
  );

  // setupAutoReact(client);
client.login(token);
if(config.WebUI){
// startWebUI();
}
startlogs();

function startlogs() {
  console.log(chalk.gray("Initializing logs...\n"));
  logger.initLogger();
  antiCrash();
}
}

if ((globalThis as any).__HYPR_STARTED__) {
  console.log("Bot already running");
} else {
  (globalThis as any).__HYPR_STARTED__ = true;

  startBot();
}
