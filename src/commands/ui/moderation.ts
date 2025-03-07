import logger from "../../utils/logger";

module.exports = {
  name: "moderation",
  aliases: ["m"],
  execute(message: any, args: any, client: any, prefix: string) {
    const page: number = args[0] || 1;
    message.channel.send(loadModerationMsg(page, prefix));
    logger.cmd(`Moderation Command executed, page: ${page}`);
    message.delete();
  },
};

function loadModerationMsg(page: number, prefix: string) {
  if (page == 1) {
    return `
> ## 🚔 **Moderation Commands - Page 1** 🚔
> 🔨 **${prefix}kick**
> ⛔ **${prefix}mute**
> 🚫 **${prefix}ban**
> 🔓 **${prefix}unban**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
  } else {
    return `> ✨ **More Commands Coming Soon!** ✨`;
  }
}
