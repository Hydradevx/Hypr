import logger from "../../utils/logger.js";
export default {
    name: "activity",
    aliases: ["a"],
    execute(message, args, client, prefix) {
        const page = args[0] || 1;
        message.channel.send(loadActivityMsg(page, prefix));
        logger.cmd(`Activity Command executed, page: ${page}`);
        message.delete();
    },
};
function loadActivityMsg(page, prefix) {
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
    }
    else {
        return `> ✨ **More Commands Coming Soon!** ✨`;
    }
}
