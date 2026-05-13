import logger from "../../utils/logger.ts";

export default {
  name: "fun",
  aliases: ["f"],
  execute(message: any, args: any, client: any, prefix: string) {
    const page: number = args[0] || 1;
    message.channel.send(loadFunMsg(page, prefix));
    logger.cmd(`Fun Command executed, page: ${page}`);
    message.delete();
  },
};

function loadFunMsg(page: number, prefix: string) {
  if (page == 1) {
    return `
> ## 🎲 **Fun Commands - Page 1** 🎲
> 🎱 **${prefix}8ball**
> 🪙 **${prefix}coinflip**
> 🌈 **${prefix}gay**
> 🤣 **${prefix}joke**
> 🖼️ **${prefix}meme**
> 💬 **${prefix}rizz**
> 🚀 **${prefix}skid**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
  } else {
    return `> ✨ **More Commands Coming Soon!** ✨`;
  }
}
