import logger from "../../utils/logger";

module.exports = {
  name: "stats",
  aliases: ["stat"],
  info: "shows server statistics",
  usage: `stats`,
  execute(message: any) {
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
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    logger.cmd(`Stats Command has been executed`);
  },
};
