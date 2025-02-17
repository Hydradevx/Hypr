"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "pfp",
  aliases: ["pf"],
  info: "shows a user's profile picture",
  usage: "pfp [@user]",
  execute(message, args) {
    const user = message.mentions.users.first() || args[0] || message.author;
    const avatar = user.displayAvatarURL({ dynamic: true, size: 1024 });
    message.channel.send(`
      ${user.username}'s Profile Picture
      \n
      ${avatar}
    `);
    logger_1.default.cmd(`Pfp command has been executed on ${user.username}`);
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
  },
};
