"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoLoad = infoLoad;
const logger_1 = __importDefault(require("./logger"));
/**
 * Sends an info message about the command.
 *
 * @param {Command} command - The command to get info about.
 * @param {Message} message - The message object from Discord.
 */
function infoLoad(command, message) {
  let infoMsg = `ℹ️ **Info about \`${command.name}\`**: \`${command.info}\``;
  if (message.author.id === message.client.user?.id)
    message.delete().catch(() => {});
  message.channel.send(infoMsg);
  logger_1.default.cmd(
    `Info Command has been executed for Command ${command.name}`,
  );
}
