import logger from "../../utils/logger";

module.exports = {
  name: "fun",
  aliases: ["f"],
  execute(message: any, args: any, client: any, prefix: string) {
    const page: number = Number(args[0]) || 1;
    message.channel.send(loadfunmsg(page, prefix));
    logger.cmd(`Fun Command has been executed and page is ${page}`);
    message.delete();
  },
};

function loadfunmsg(page: number, prefix: string) {
  if (page === 1) {
    return `
> ## 🎉 **Fun Commands - Page 1** 🎉
> 🕹️ **Command List:**
> 💖 **${prefix}rizz**
> 😂 **${prefix}joke**
> 🎱 **${prefix}8ball**
> 🪙 **${prefix}coinflip**
> 🤣 **${prefix}meme**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
  } else if (page === 2) {
    return `
> ## 🎉 **Fun Commands - Page 2** 🎉
> 🕹️ **Command List:**
> 🌈 **${prefix}gay**
> 💻 **${prefix}skid**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
  } else {
    return "> ✨ **More Commands Coming Soon!** ✨";
  }
}
