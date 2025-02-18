"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "help",
  aliases: ["h"],
  execute(message, prefix) {
    message.channel.send(helpmsg(prefix));
    logger_1.default.cmd(`Help Command has been excuted`);
    message.delete();
  },
};
function helpmsg(prefix) {
  return `
> ✨ **${prefix}[section] [page] ? Default is 1** ✨
> 
> 🔨 **${prefix}raids**
> 📊 **${prefix}info**
> 🎲 **${prefix}fun**
> 🛠️ **${prefix}tools**
> 📡 **${prefix}discordtools**
> 👤 **${prefix}profile**
> 
> ✨ Add --info or --usage After a Command to Get more Information about it.
> ✨ Selfbot crafted by \`@hydradevx\`

    `;
}
