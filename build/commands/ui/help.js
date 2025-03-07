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
  execute(message, args, client, prefix) {
    message.channel.send(helpmsg(prefix));
    logger_1.default.cmd(`Help Command has been executed`);
    message.delete();
  },
};
function helpmsg(prefix) {
  return `
> ✨ **${prefix}[section]** ✨
> 
> 🔨 **${prefix}general**
> 🎲 **${prefix}fun**
> 🔧 **${prefix}utility**
> 🎮 **${prefix}activity**
> 💥 **${prefix}raiding**
> 🚔 **${prefix}moderation**
> 🛠 **${prefix}tools**
> 
> ✨ Add --info or --usage After a Command to Get more Information about it.
> ✨ Selfbot crafted by \`@hydradevx\`
  `;
}
