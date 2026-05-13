import logger from "../../utils/logger.ts";

export default {
  name: "help",
  aliases: ["h"],
  execute(message: any, args: any, client: any, prefix: string) {
    message.channel.send(helpmsg(prefix));
    logger.cmd(`Help Command has been executed`);
    message.delete();
  },
};

function helpmsg(prefix: string) {
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
