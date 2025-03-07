"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "raiding",
  aliases: ["r"],
  execute(message, args, client, prefix) {
    const page = args[0] || 1;
    message.channel.send(loadRaidingMsg(page, prefix));
    logger_1.default.cmd(`Raiding Command executed, page: ${page}`);
    message.delete();
  },
};
function loadRaidingMsg(page, prefix) {
  if (page == 1) {
    return `
> ## 💥 **Raiding Commands - Page 1** 💥
> 💀 **${prefix}banAllMembers**
> 🔥 **${prefix}clear**
> 🚨 **${prefix}clearAllMessages**
> 🏴‍☠️ **${prefix}deleteCategories**
> 🛑 **${prefix}deleteChannels**
> 🚧 **${prefix}deleteRoles**
> 💣 **${prefix}destroy**
> ☢️ **${prefix}nuke**
> 🔥 **${prefix}raidstart**
> 🛑 **${prefix}raidstop**
> 📢 **${prefix}spam**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
  } else {
    return `> ✨ **More Commands Coming Soon!** ✨`;
  }
}
