import logger from "../../utils/logger.ts";

export default {
  name: "utility",
  aliases: ["u"],
  execute(message: any, args: any, client: any, prefix: string) {
    const page: number = args[0] || 1;
    message.channel.send(loadUtilityMsg(page, prefix));
    logger.cmd(`Utility Command executed, page: ${page}`);
    message.delete();
  },
};

function loadUtilityMsg(page: number, prefix: string) {
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
