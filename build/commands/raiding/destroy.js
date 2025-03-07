"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "destroy",
  aliases: ["destroyAll", "annihilate", "wipeServer"],
  info: "destroys the server",
  usage: "destroy",
  async execute(message) {
    await message.delete();
    const confirmMessage = await message.channel.send(
      " Are you sure you want to **DESTROY EVERYTHING**? Type `confirm` to proceed.",
    );
    const filter = (response) =>
      response.author.id === message.author.id &&
      response.content.toLowerCase() === "confirm";
    const collector = confirmMessage.channel.createMessageCollector({
      filter,
      time: 10000,
    });
    collector.on("collect", async (collected) => {
      confirmMessage.edit("Destroying the server...");
      message.guild.channels.cache.forEach((channel) =>
        channel.delete().catch(console.error),
      );
      message.guild.roles.cache
        .filter((role) => role.name !== "@everyone")
        .forEach((role) => role.delete().catch(console.error));
      message.guild.members.cache
        .filter((member) => !member.user.bot && member.id !== message.author.id)
        .forEach((member) =>
          member.ban({ reason: "Server destruction" }).catch(console.error),
        );
      message.guild.channels.cache
        .filter((channel) => channel.type === "GUILD_CATEGORY")
        .forEach((category) => category.delete().catch(console.error));
      confirmMessage.edit(" Server destroyed.");
      logger_1.default.cmd("Server destroyed by user.");
    });
  },
};
