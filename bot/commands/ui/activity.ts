import logger from "../../utils/logger";

export default {
  name: "activity",
  aliases: ["a"],
  execute(message: any, args: any, client: any, prefix: string) {
    const page: number = args[0] || 1;
    message.channel.send(loadActivityMsg(page, prefix));
    logger.cmd(`Activity Command executed, page: ${page}`);
    message.delete();
  },
};

function loadActivityMsg(page: number, prefix: string) {
  if (page == 1) {
    return `
> ## 🎮 **Activity Commands - Page 1** 🎮
> 🟢 **${prefix}afk**
> ⛔ **${prefix}dnd**
> 🌙 **${prefix}idle**
> 🎵 **${prefix}listen**
> ▶️ **${prefix}play**
> ⏹ **${prefix}stopactivity**
> 📺 **${prefix}stream**
> 🔄 **${prefix}unafk**
> 🎬 **${prefix}watch**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
  } else {
    return `> ✨ **More Commands Coming Soon!** ✨`;
  }
}
