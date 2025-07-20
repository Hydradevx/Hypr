import { Message } from "discord.js-selfbot-v13";
import logger from "./logger.js";

interface Command {
  name: string;
  info: string;
}

/**
 * Sends an info message about the command.
 *
 * @param {Command} command - The command to get info about.
 * @param {Message} message - The message object from Discord.
 */
function infoLoad(command: Command, message: Message): void {
  let infoMsg = `ℹ️ **Info about \`${command.name}\`**: \`${command.info}\``;
  if (message.author.id === message.client.user?.id)
    message.delete().catch(() => {});
  message.channel.send(infoMsg);
  logger.cmd(`Info Command has been executed for Command ${command.name}`);
}

export { infoLoad };
