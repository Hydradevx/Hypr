import logger from "../../utils/logger";

module.exports = {
  name: "info",
  aliases: ["i"],
  execute(message: any, args: any, prefix: string) {
    const page = args[0] || 1;
    message.channel.send(loadinfomsg(page, prefix));
    logger.cmd(`Info Command has been executed and page is ${page}`);

    message.delete();
  },
};

function loadinfomsg(page: number, prefix: string) {
  if (page == 1) {
    return `
> ## 🌟 **Info Commands - Page 1** 🌟
> 📊 **Command List:**
> 📈 **${prefix}stats**
> 🏓 **${prefix}ping**
> 🔍 **${prefix}userinfo**
> 🖼️ **${prefix}pfp**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
  }
  if (page == 2) {
    return `
> ## 🌟 **Info Commands - Page 2** 🌟
> 👥 **${prefix}roles**
> 🔧 **${prefix}setprefix**
> 🔎 **${prefix}checkprefix**
> 👀 **${prefix}listallcommands**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
  } else {
    return `> ✨ **More Commands Coming Soon!** ✨`;
  }
}
