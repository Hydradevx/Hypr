"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "roles",
  aliases: ["listroles", "roleslist"],
  info: "lists roles of a user",
  usage: "roles [@user]",
  execute(message, args) {
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    const user = message.mentions.users.first() || args[0];
    if (!user)
      return message.channel.send("Please mention a user to list roles.");
    const member = message.guild.members.cache.get(user.id);
    if (!member) return message.channel.send("User not found in the server.");
    const roles = member.roles.cache
      .filter((role) => role.name !== "@everyone")
      .map((role) => role.name)
      .join(", ");
    message.channel.send(
      `👤 **Roles for ${user.username}:** ${roles.length == 0 ? "None of them lol" : roles}`,
    );
    logger_1.default.cmd(
      `Roles command has been executed on ${user.username} and Roles are ${roles}`,
    );
  },
};
