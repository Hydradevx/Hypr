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
  aliases: ["t"],
  execute(message, args, client, prefix) {
    const page = args[0] || 1;
    message.channel.send(loadToolsMsg(page, prefix));
    logger_1.default.cmd(`Tools Command executed, page: ${page}`);
    message.delete();
  },
};
function loadToolsMsg(page, prefix) {
  if (page == 1) {
    return `
> ## 🛠 **Tools Commands - Page 1** 🛠
> 🎁 **${prefix}giveawaysniper**
> 🌍 **${prefix}iplookup**
> 🚀 **${prefix}autoreact**
> 🎁 **${prefix}nitrosniper**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
  } else {
    return `> ✨ **More Commands Coming Soon!** ✨`;
  }
}
