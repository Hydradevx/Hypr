import logger from "../../utils/logger";
import path from "path";
import fs from "fs";
const configPath = path.join(__dirname, "../../../config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

let prefix = config.prefix;

module.exports = {
  name: "discordtools",
  aliases: ["dt", "dsicord", "discordt", "dst"],
  execute(message: any, args: any) {
    const page = args[0] || "1";
    message.channel.send(loaddiscordtoolsmsg(page));
    logger.cmd(`discordtools Command has been executed and page is ${page}`);
    message.delete();
  },
};

function loaddiscordtoolsmsg(page: string) {
  if (page === "1") {
    return `
> ## 🛠️ **Discord Tools - Page 1** 🛠️
> 🔍 **Command List:**
> 📌 **${prefix}pin**
> 🔒 **${prefix}lock**
> 🔓 **${prefix}unlock**
> 📄 **${prefix}archive**
> 📄 **${prefix}cloneserver**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
  } else if (page === "2") {
    return `
> ## 🛠️ **Discord Tools - Page 2** 🛠️
> 🔍 **Command List:**
> 📢 **${prefix}announce**
> ⚠️ **${prefix}warn**
> 💬 **${prefix}quote**
> 🐌 **${prefix}slowmode**
> 🌐 **${prefix}translate**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
  } else if (page === "3") {
    return `
> ## 🛠️ **Discord Tools - Page 3** 🛠️
> 🔍 **Command List:**
> 📊 **${prefix}poll**
> ⏰ **${prefix}remind**
> 📬 **${prefix}dm**
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
  } else {
    return "> ✨ **More Commands Coming Soon!** ✨";
  }
}
