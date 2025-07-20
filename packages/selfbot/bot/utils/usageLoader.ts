import { Message } from "discord.js-selfbot-v13";
import logger from "./logger.js";
interface Command {
  name: string;
  usage?: string;
}

/**
 * Loads the usage of a command and sends it in the channel.
 *
 * @param {Command} command - The command object.
 * @param {Message} message - The Discord message object.
 * @param {string} prefix - The bot's command prefix.
 */
function usageLoad(command: Command, message: Message, prefix: string): void {
  const usageMsg = `ℹ️ **Usage of \`${command.name}\`**: \`${prefix}${command.usage || "No usage available"}\``;

  if (message.author.id === message.client.user?.id) {
    message.delete().catch(() => {});
  }

  message.channel
    .send(usageMsg)
    .catch((err) => console.error("Failed to send usage message:", err));

  logger.cmd(`Usage Command has been executed for Command ${command.name}`);
}

export { usageLoad };
