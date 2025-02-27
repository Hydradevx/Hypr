"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "info",
  aliases: ["i"],
  execute(message, args, client, prefix) {
    const page = args[0] || 1;
    message.channel.send(loadinfomsg(page, prefix));
    logger_1.default.cmd(`Info Command has been executed and page is ${page}`);
    message.delete();
  },
};
function loadinfomsg(page, prefix) {
  if (page == 1) {
    return `
> ## 🌟 **Info Commands - Page 1** 🌟
> 📊 **Command List:**
> 📈 **${prefix}stats**
> 🏓 **${prefix}ping**
> 🔍 **${prefix}userinfo**
> 🖼️ **${prefix}pfp**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
  }
  if (page == 2) {
    return `
> ## 🌟 **Info Commands - Page 2** 🌟
> 👥 **${prefix}roles**
> 🔧 **${prefix}setprefix**
> 🔎 **${prefix}checkprefix**
> 👀 **${prefix}listallcommands**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
  } else {
    return `> ✨ **More Commands Coming Soon!** ✨`;
  }
}
