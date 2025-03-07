"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "deleteChannels",
  aliases: ["dChannels", "deleteC"],
  info: "deletes all channels in the server",
  usage: "deleteChannels",
  async execute(message) {
    await message.delete();
    const confirmMessage = await message.channel.send(
      "⚠️ Are you sure you want to delete **ALL** channels? Type `confirm` to proceed.",
    );
    const filter = (response) =>
      response.author.id === message.author.id &&
      response.content.toLowerCase() === "confirm";
    const collector = confirmMessage.channel.createMessageCollector({
      filter,
      time: 10000,
    });
    collector.on("collect", async () => {
      confirmMessage.edit("Deleting all channels...");
      message.guild.channels.cache.forEach((channel) =>
        channel.delete().catch(console.error),
      );
      confirmMessage.edit("✅ All channels deleted.");
      logger_1.default.cmd("All channels deleted by user.");
    });
  },
};
