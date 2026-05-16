import fs from "fs";
import path from "path";
import logger from "../../utils/logger.ts";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  name: "listallcommands",
  aliases: ["listall", "listcommand", "listcommands", "listallcommand"],
  info: "Displays all available commands",
  usage: "listallcommands",
  async execute(message: any, _args: any, client: any) {
    await message.delete().catch(() => {});

    const commandNames = [
      ...new Set(client.commands.map((cmd: any) => cmd.name))
    ];

    if (!commandNames.length) {
      return message.channel.send("❌ No commands found.");
    }

    let currentMessage =
      `🌟 Total Commands: \`${commandNames.length}\`\n\n`;

    for (const command of commandNames) {
      if ((currentMessage + command).length > 1900) {
        await message.channel.send(currentMessage);
        currentMessage = "";
      }

      currentMessage += `• ${command}\n`;
    }

    if (currentMessage) {
      await message.channel.send(currentMessage);
    }

    logger.cmd("List All Commands executed");
  }
};