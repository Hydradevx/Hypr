import logger from "../../utils/logger";

module.exports = {
  name: "userinfo",
  aliases: ["ui"],
  info: "shows user information",
  usage: "userinfo [@user]",
  execute(message: any, args: any) {
    const user = message.mentions.users.first() || message.author || args[0];
    getuserinfo(message, user);
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
  },
};

function getuserinfo(message: any, mentionedUser: any) {
  const userID = mentionedUser.id;
  const username = mentionedUser.username;
  const discriminator = mentionedUser.discriminator;
  const createdAt = mentionedUser.createdAt.toDateString();
  const status = mentionedUser.presence
    ? mentionedUser.presence.status
    : "offline";

  const userInfoMessage = `
> ## 👤 **User Information** 👤
> 
> **Username:** ${username}#${discriminator}
> **User ID:** ${userID}
> **Account Created On:** ${createdAt}
> **Current Status:** ${status}
> 
> ✨ Selfbot crafted by \`@hydradevx\`
`;

  logger.cmd(
    `Userinfo Command has been excuted on user ${username}#${discriminator}`,
  );
  message.channel.send(userInfoMessage);
}
