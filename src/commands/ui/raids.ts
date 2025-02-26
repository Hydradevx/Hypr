import logger from "../../utils/logger";

module.exports = {
  name: "raids",
  aliases: ["r", "raid"],
  execute(message: any, args: any, prefix: string) {
    const page: number = args[0] || 1;
    let msg = loadraidmsg(page, prefix);
    message.channel.send(msg);
    logger.cmd(`Raids Command has been executed and page is ${page}`);

    message.delete();
  },
};

function loadraidmsg(page: number, prefix: string) {
  if (page === 1) {
    return `
> ## 🚀 **Raids Commands - Page 1** 🚀
> 📜 **Command List:**
> 📨 **${prefix}spam**
> 💥 **${prefix}nuke**
> 🏁 **${prefix}raidstart**
> 🛑 **${prefix}raidstop**
> 🧹 **${prefix}clear**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
  } else if (page === 2) {
    return `
> ## 🚀 **Raids Commands - Page 2** 🚀
> 📜 **Command List:**
> 🗑️ **${prefix}deleteChannels**
> 🗑️ **${prefix}deleteRoles**
> 🔨 **${prefix}banAllMembers**
> 🧹 **${prefix}clearAllMessages**
> 🗂️ **${prefix}deleteCategories**
> 💣 **${prefix}destroy**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
  } else {
    return "> **More Commands Coming Soon!**";
  }
}
