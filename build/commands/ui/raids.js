"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "raids",
  aliases: ["r", "raid"],
  execute(message, args, prefix) {
    const page = args[0] || 1;
    message.channel.send(loadraidmsg(page, prefix));
    logger_1.default.cmd(`Raids Command has been executed and page is ${page}`);
    message.delete();
  },
};
function loadraidmsg(page, prefix) {
  if (page == 1) {
    return `
> ## 🚀 **Raids Commands - Page 1** 🚀
> 📜 **Command List:**
> 📨 **${prefix}spam**
> 💥 **${prefix}nuke**
> 🏁 **${prefix}raidstart**
> 🛑 **${prefix}raidstop**
> 🧹 **${prefix}clear**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
  } else if (page == 2) {
    return `
> ## 🚀 **Raids Commands - Page 2** 🚀
> 📜 **Command List:**
> 🗑️ **${prefix}deleteChannels**
> 🗑️ **${prefix}deleteRoles**
> 🔨 **${prefix}banAllMembers**
> 🧹 **${prefix}clearAllMessages**
> 🗂️ **${prefix}deleteCategories**
> 💣 **${prefix}destroy**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
  } else {
    return "> **More Commands Coming Soon!**";
  }
}
