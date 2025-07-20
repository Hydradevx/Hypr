import logger from "../../utils/logger.js";

export default {
  name: "general",
  aliases: ["g"],
  execute(message: any, args: any, client: any, prefix: string) {
    const page: number = args[0] || 1;
    message.channel.send(loadGeneralMsg(page, prefix));
    logger.cmd(`General Command executed, page: ${page}`);
    message.delete();
  },
};

function loadGeneralMsg(page: number, prefix: string) {
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
> 🔓 **${prefix}unlock**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
  } else {
    return `> ✨ **More Commands Coming Soon!** ✨`;
  }
}
