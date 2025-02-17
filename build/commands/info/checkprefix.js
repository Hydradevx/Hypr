"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "checkprefix",
  aliases: ["prefix"],
  info: "displays the current prefix for the bot",
  usage: "checkprefix",
  execute(message, prefix) {
    const prefixMessage = `
> ## 🔎 **Current Prefix** 🔎
> 
> The current prefix for this bot is: \`${prefix}\`
> 
> **Example usage:** ${prefix}help
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
    message.channel.send(prefixMessage);
    logger_1.default.cmd(
      `Checkprefix command executed. Current prefix: ${prefix}`,
    );
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
  },
};
