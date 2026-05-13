import logger from "../../utils/logger.ts";

export default {
  name: "raiding",
  aliases: ["r"],
  execute(message: any, args: any, client: any, prefix: string) {
    const page: number = args[0] || 1;
    message.channel.send(loadRaidingMsg(page, prefix));
    logger.cmd(`Raiding Command executed, page: ${page}`);
    message.delete();
  },
};

function loadRaidingMsg(page: number, prefix: string) {
  if (page == 1) {
    return `
> ## 💥 **Raiding Commands - Page 1** 💥
> 💀 **${prefix}banAllMembers**
> 🔥 **${prefix}clear**
> 🚨 **${prefix}clearAllMessages**
> 🏴‍☠️ **${prefix}deleteCategories**
> 🛑 **${prefix}deleteChannels**
> 🚧 **${prefix}deleteRoles**
> 💣 **${prefix}destroy**
> ☢️ **${prefix}nuke**
> 🔥 **${prefix}raidstart**
> 🛑 **${prefix}raidstop**
> 📢 **${prefix}spam**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
  } else {
    return `> ✨ **More Commands Coming Soon!** ✨`;
  }
}
