import fs from "fs";
import path from "path";
import logger from "../../utils/logger.js";

export default {
  name: "listallcommands",
  aliases: ["listall", "listcommand", "listcommands", "listallcommand"],
  info: "Displays all available commands",
  usage: "listallcommands",
  async execute(message: any) {
    await message.delete();

    function getFilesRecursively(directory: string): string[] {
      let files: string[] = [];
      const items = fs.readdirSync(directory, { withFileTypes: true });

      for (const item of items) {
        const fullPath = path.join(directory, item.name);
        if (item.isDirectory()) {
          files = files.concat(getFilesRecursively(fullPath));
        } else if (item.isFile() && fullPath.endsWith(".ts")) {
          files.push(fullPath);
        }
      }
      return files;
    }

    const commandsPath = path.join(__dirname, "../");
    const commandFiles = getFilesRecursively(commandsPath);

    let commandNames: string[] = [];

    for (const filePath of commandFiles) {
      try {
        const command = require(filePath);
        if (command.name) commandNames.push(command.name);
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
