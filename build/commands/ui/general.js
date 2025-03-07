"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "general",
  aliases: ["g"],
  execute(message, args, client, prefix) {
    const page = args[0] || 1;
    message.channel.send(loadGeneralMsg(page, prefix));
    logger_1.default.cmd(`General Command executed, page: ${page}`);
    message.delete();
  },
};
function loadGeneralMsg(page, prefix) {
  if (page == 1) {
    return `
> ## 🔨 **General Commands - Page 1** 🔨
> 📝 **${prefix}announce**
> 📌 **${prefix}archive**
> ✉️ **${prefix}dm**
> 🔒 **${prefix}lock**
> 📌 **${prefix}pin**
> 📊 **${prefix}poll**
> 🗨️ **${prefix}quote**
> ⏰ **${prefix}remind**
> 🕒 **${prefix}slowmode**
> 🔓 **${prefix}unlock**
> ⚠️ **${prefix}warn**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
  } else {
    return `> ✨ **More Commands Coming Soon!** ✨`;
  }
}
