"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "moderation",
  aliases: ["m"],
  execute(message, args, client, prefix) {
    const page = args[0] || 1;
    message.channel.send(loadModerationMsg(page, prefix));
    logger_1.default.cmd(`Moderation Command executed, page: ${page}`);
    message.delete();
  },
};
function loadModerationMsg(page, prefix) {
  if (page == 1) {
    return `
> ## 🚔 **Moderation Commands - Page 1** 🚔
> 🔨 **${prefix}kick**
> ⛔ **${prefix}mute**
> 🚫 **${prefix}ban**
> 🔓 **${prefix}unban**
> 🕒 **${prefix}slowmode**
> ⚠️ **${prefix}warn**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
  } else {
    return `> ✨ **More Commands Coming Soon!** ✨`;
  }
}
