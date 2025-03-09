"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "utility",
  aliases: ["u"],
  execute(message, args, client, prefix) {
    const page = args[0] || 1;
    message.channel.send(loadUtilityMsg(page, prefix));
    logger_1.default.cmd(`Utility Command executed, page: ${page}`);
    message.delete();
  },
};
function loadUtilityMsg(page, prefix) {
  if (page == 1) {
    return `
> ## 🔧 **Utility Commands - Page 1** 🔧
> 🔍 **${prefix}checkprefix**
> 📜 **${prefix}listallcommands**
> 🖼️ **${prefix}pfp**
> 📡 **${prefix}ping**
> 🏷 **${prefix}roles**
> ⚙️ **${prefix}setprefix**
> 📊 **${prefix}stats**
> 🆔 **${prefix}userinfo**
> 🎭 **${prefix}cloneserver**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
  } else {
    return `> ✨ **More Commands Coming Soon!** ✨`;
  }
}
