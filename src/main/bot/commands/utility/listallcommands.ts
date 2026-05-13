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
  async execute(message) {
    await message.delete();

    function getFilesRecursively(dir) {
      let files: any = [];
      const items = fs.readdirSync(dir, { withFileTypes: true });

      for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
          files = files.concat(getFilesRecursively(fullPath));
        } else if (item.isFile() && fullPath.endsWith(".js")) {
          files.push(fullPath);
        }
      }

      return files;
    }

    const commandsPath = path.join(__dirname, "../");
    const commandFiles = getFilesRecursively(commandsPath);
    let commandNames: any[] = [];

    for (const filePath of commandFiles) {
      try {
        const commandModule = await import(pathToFileURL(filePath).href);
        const command = commandModule.default;

        if (command?.name) commandNames.push(command.name);
      } catch (error: any) {
        logger.error(`Failed to load command at ${filePath}: ${error.message}`);
      }
    }

    if (commandNames.length === 0)
      return message.channel.send("❌ No commands found.");

    const commandCount = commandNames.length;
    const chunkSize = 1950;
    let currentMessage = `🌟 **Wow! There are a total of \`${commandCount}\` commands available.** 🌟\n\n📚 **Available Commands:**\n`;

    for (const command of commandNames) {
      if ((currentMessage + `\n• ${command}`).length > chunkSize) {
        await message.channel.send(currentMessage);
        currentMessage = "📚 **Available Commands (continued):**\n";
      }
      currentMessage += `\n• ${command}`;
    }

    if (currentMessage) await message.channel.send(currentMessage);

    logger.cmd("List All Commands Command has been executed");
  },
};