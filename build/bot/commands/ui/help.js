import logger from "../../utils/logger.js";
export default {
    name: "help",
    aliases: ["h"],
    execute(message, args, client, prefix) {
        message.channel.send(helpmsg(prefix));
        logger.cmd(`Help Command has been executed`);
        message.delete();
    },
};
function helpmsg(prefix) {
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
