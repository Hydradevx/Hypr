import logger from "../../utils/logger";

module.exports = {
  name: "tools",
  aliases: ["t", "tool"],
  execute(message: any, args: any, prefix: string) {
    const page: number = args[0] || 1;
    message.channel.send(loadtoolsmsg(page, prefix));
    logger.cmd(`Tools Command has been executed and page is ${page}`);

    message.delete();
  },
};

function loadtoolsmsg(page: number, prefix: string) {
  if (page == 1) {
    return `
> ## 🚨 **Tools Commands - Page 1** 🚨
> ⚔️ **Command List:**
> 👤 **${prefix}kick**
> 🚫 **${prefix}ban**
> 🔓 **${prefix}unban**
> 🔇 **${prefix}mute**
> 📝 **${prefix}cloneserver**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
  } else {
    return `> ✨ **More Commands Coming Soon!** ✨`;
  }
}
