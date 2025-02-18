import logger from "../../utils/logger";

module.exports = {
  name: "help",
  aliases: ["h"],
  execute(message: any, prefix: string) {
    message.channel.send(helpmsg(prefix));

    logger.cmd(`Help Command has been excuted`);
    message.delete();
  },
};

function helpmsg(prefix: string) {
  return `
> ✨ **${prefix}[section] [page] ? Default is 1** ✨
> 
> 🔨 **${prefix}raids**
> 📊 **${prefix}info**
> 🎲 **${prefix}fun**
> 🛠️ **${prefix}tools**
> 📡 **${prefix}discordtools**
> 👤 **${prefix}profile**
> 
> ✨ Add --info or --usage After a Command to Get more Information about it.
> ✨ Selfbot crafted by \`@hydradevx\`

    `;
}
