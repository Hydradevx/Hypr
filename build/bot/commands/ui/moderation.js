import logger from "../../utils/logger.js";
export default {
    name: "moderation",
    aliases: ["m"],
    execute(message, args, client, prefix) {
        const page = args[0] || 1;
        message.channel.send(loadModerationMsg(page, prefix));
        logger.cmd(`Moderation Command executed, page: ${page}`);
        message.delete();
    },
};
function loadModerationMsg(page, prefix) {
    if (page == 1) {
        return `
> ## 🚔 **Moderation Commands - Page 1** 🚔
> 🔨 **${prefix}kick**
> ⛔ **${prefix}mute**
> 🚫 **${prefix}ban**
> 🔓 **${prefix}unban**
> 🕒 **${prefix}slowmode**
> ⚠️ **${prefix}warn**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
    }
    else {
        return `> ✨ **More Commands Coming Soon!** ✨`;
    }
}
