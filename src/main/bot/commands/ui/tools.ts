import logger from "../../utils/logger.ts";

export default {
  name: "tools",
  aliases: ["t"],
  execute(message: any, args: any, client: any, prefix: string) {
    const page: number = args[0] || 1;
    message.channel.send(loadToolsMsg(page, prefix));
    logger.cmd(`Tools Command executed, page: ${page}`);
    message.delete();
  },
};

function loadToolsMsg(page: number, prefix: string) {
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
