"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "activity",
  aliases: ["a"],
  execute(message, args, client, prefix) {
    const page = args[0] || 1;
    message.channel.send(loadActivityMsg(page, prefix));
    logger_1.default.cmd(`Activity Command executed, page: ${page}`);
    message.delete();
  },
};
function loadActivityMsg(page, prefix) {
  if (page == 1) {
    return `
> ## 🎮 **Activity Commands - Page 1** 🎮
> 🟢 **${prefix}afk**
> ⛔ **${prefix}dnd**
> 🌙 **${prefix}idle**
> 🎵 **${prefix}listen**
> ▶️ **${prefix}play**
> ⏹ **${prefix}stopactivity**
> 📺 **${prefix}stream**
> 🔄 **${prefix}unafk**
> 🎬 **${prefix}watch**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
  } else {
    return `> ✨ **More Commands Coming Soon!** ✨`;
  }
}
