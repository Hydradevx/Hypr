"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "stats",
  aliases: ["stat"],
  info: "shows server statistics",
  usage: `stats`,
  execute(message) {
    const memberCount = message.guild.memberCount;
    const roleCount = message.guild.roles.cache.size;
    const channelCount = message.guild.channels.cache.size;
    const serverid = message.guild.id;
    const servername = message.guild.name;
    const servericon = message.guild.iconURL({
      format: "png",
      dynamic: true,
      size: 1024,
    });
    const servercreated = message.guild.createdAt;
    const serverowner = message.guild.ownerId;
    const statsMessage = `
> ## 📊 **Server Stats** 📊
> **Server Name:** ${servername}
> **Server Created:** ${servercreated}
> **Server Owner:** ${serverowner}
> **Total Members:** ${memberCount}
> **Total Roles:** ${roleCount}
> **Total Channels:** ${channelCount}
> **Server ID:** ${serverid}
> **Server Icon:** ${servericon}
> 
> ✨ Selfbot crafted by \`@hydra_devx\`
`;
    message.channel.send(statsMessage);
    message.delete();
    logger_1.default.cmd(`Stats Command has been executed`);
  },
};
