import { Client } from "discord.js-selfbot-v13";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import logger from "./bot/utils/logger.ts";
import { usageLoad } from "./bot/utils/usageLoader.ts";
import { infoLoad } from "./bot/utils/infoLoader.ts";
import afkState from "./bot/managers/afkState.ts";
import { setRichPresence } from "./bot/utils/richPresence.ts";
import { setupAutoReact } from "./bot/features/autoReact.ts";
import { equipInvisibilityCloak } from "./bot/features/invisibilityCloak.ts";
import { pathToFileURL } from "url";
import { doesConfigExists, getConfig } from "./bot/utils/config-read.ts"
import { app } from "electron";
import * as Discord from "discord.js";
import { GatewayIntentBits, Collection, REST, Routes, Interaction, } from "discord.js";


function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


async function waitForConfig() {
  while (!doesConfigExists()) {
    logger.warn("Waiting for config...");
    await sleep(1000);
  }

  logger.info("Config detected");
  return getConfig();
}


export const client: any = new Client();
export const botClient: any = new Discord.Client({ intents: [ GatewayIntentBits.Guilds, ], });

let config: any;
let token = "";
let prefix = "!";
let safetyTime = 60000 * 5;

botClient.commands = new Collection();

const isDev = !app.isPackaged;

const commandsPath = isDev
  ? path.join(
      process.cwd(),
      "src/main/bot/slashCommands"
    )
  : path.join(
      app.getAppPath(),
      "out/main/bot/slashCommands"
    );

function getFilesRecursively(
  directory: string
): string[] {
  let files: string[] = [];

  if (!fs.existsSync(directory)) {
    logger.error(
      `Slash commands directory missing: ${directory}`
    );

    return files;
  }

  const items = fs.readdirSync(
    directory,
    {
      withFileTypes: true,
    }
  );

  for (const item of items) {
    const fullPath = path.join(
      directory,
      item.name
    );

    if (item.isDirectory()) {
      files.push(
        ...getFilesRecursively(
          fullPath
        )
      );
    } else if (
      item.isFile() &&
      (
        fullPath.endsWith(".js") ||
        (
          isDev &&
          fullPath.endsWith(".ts") &&
          !fullPath.endsWith(".d.ts")
        )
      )
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

async function loadSlashCommands() {
  const commandFiles =
    getFilesRecursively(
      commandsPath
    );

  const slashData: any[] = [];

  for (const filePath of commandFiles) {
    try {
      const commandModule =
        await import(
          pathToFileURL(filePath).href
        );

      const command =
        commandModule.default ||
        commandModule;

      if (
        command?.data &&
        command?.execute
      ) {
        botClient.commands.set(
          command.data.name,
          command
        );

        slashData.push(
          command.data.toJSON()
        );

        logger.info(
          `Loaded slash command ${command.data.name}`
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  const rest = new REST({
    version: "10",
  }).setToken(config.botToken);

  await rest.put(
    Routes.applicationCommands(
      config.applicationId
    ),
    {
      body: slashData,
    }
  );

  logger.info(
    `Registered ${slashData.length} slash commands`
  );
}

botClient.on(
  "interactionCreate",
  async (interaction: Interaction) => {
    if (
      !interaction.isChatInputCommand()
    )
      return;

    if (
      interaction.user.id !==
      config.ownerId
    ) {
      await interaction.reply({
        content:
          "You are not allowed to use this bot.",
        ephemeral: true,
      });

      return;
    }

    const command =
      botClient.commands.get(
        interaction.commandName
      );

    if (!command) return;

    try {
      await command.execute(
        interaction,
        client,
        config
      );
    } catch (err) {
      console.error(err);

      if (
        interaction.isRepliable()
      ) {
        await interaction.reply({
          content:
            "Command execution failed",
          ephemeral: true,
        });
      }
    }
  }
);


client.on("ready", async () => {
  logger.status(`Logged in as ${client.user?.tag}`);
  if(config.rpc) {
    setRichPresence(client);
  }
  logger.status("Prefix is" + chalk.cyan(` ${prefix}`));
  equipInvisibilityCloak(client);
});


let client_info = {
  raidsEnabled: false,
  moreCmdSoonMessage: "✨ **More Commands Coming Soon!** ✨",
};

client.info = client_info;

sleep(100);

async function startBot() {
  config = await waitForConfig();

  token = config.token;
  prefix = config.prefix || "!";

  safetyTime =
    config.safetyTime * 1000 || 60000 * 5;

  // await loadCommands();
client.login(token);

await loadSlashCommands();

await botClient.login(config.botToken);

logger.info(
  `Bot logged in as ${botClient.user?.tag}`
);

startlogs();

function startlogs() {
  console.log(chalk.gray("Initializing logs...\n"));
  logger.initLogger();
}
}

if ((globalThis as any).__HYPR_STARTED__) {
  console.log("Bot already running");
} else {
  (globalThis as any).__HYPR_STARTED__ = true;

  startBot();
}
