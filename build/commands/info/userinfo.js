"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "userinfo",
  aliases: ["ui"],
  info: "shows user information",
  usage: "userinfo [@user]",
  execute(message, args) {
    const user = message.mentions.users.first() || message.author || args[0];
    getuserinfo(message, user);
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
  },
};
function getuserinfo(message, mentionedUser) {
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
  logger_1.default.cmd(
    `Userinfo Command has been excuted on user ${username}#${discriminator}`,
  );
  message.channel.send(userInfoMessage);
}
