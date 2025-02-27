"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "tools",
  aliases: ["t", "tool"],
  execute(message, args, client, prefix) {
    const page = args[0] || 1;
    message.channel.send(loadtoolsmsg(page, prefix));
    logger_1.default.cmd(`Tools Command has been executed and page is ${page}`);
    message.delete();
  },
};
function loadtoolsmsg(page, prefix) {
  if (page == 1) {
    return `
> ## 🚨 **Tools Commands - Page 1** 🚨
> ⚔️ **Command List:**
> 👤 **${prefix}kick**
> 🚫 **${prefix}ban**
> 🔓 **${prefix}unban**
> 🔇 **${prefix}mute**
> 📝 **${prefix}cloneserver**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
  } else {
    return `> ✨ **More Commands Coming Soon!** ✨`;
  }
}
