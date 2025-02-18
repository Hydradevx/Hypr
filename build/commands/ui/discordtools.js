"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "discordtools",
  aliases: ["dt", "dsicord", "discordt", "dst"],
  execute(message, args, prefix) {
    const page = args[0] || "1";
    message.channel.send(loaddiscordtoolsmsg(page, prefix));
    logger_1.default.cmd(
      `discordtools Command has been executed and page is ${page}`,
    );
    message.delete();
  },
};
function loaddiscordtoolsmsg(page, prefix) {
  if (page === "1") {
    return `
> ## 🛠️ **Discord Tools - Page 1** 🛠️
> 🔍 **Command List:**
> 📌 **${prefix}pin**
> 🔒 **${prefix}lock**
> 🔓 **${prefix}unlock**
> 📄 **${prefix}archive**
> 📄 **${prefix}cloneserver**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
  } else if (page === "2") {
    return `
> ## 🛠️ **Discord Tools - Page 2** 🛠️
> 🔍 **Command List:**
> 📢 **${prefix}announce**
> ⚠️ **${prefix}warn**
> 💬 **${prefix}quote**
> 🐌 **${prefix}slowmode**
> 🌐 **${prefix}translate**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
  } else if (page === "3") {
    return `
> ## 🛠️ **Discord Tools - Page 3** 🛠️
> 🔍 **Command List:**
> 📊 **${prefix}poll**
> ⏰ **${prefix}remind**
> 📬 **${prefix}dm**
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
  } else {
    return "> ✨ **More Commands Coming Soon!** ✨";
  }
}
