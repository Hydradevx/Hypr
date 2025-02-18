"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "clearAllMessages",
  aliases: ["clearAll", "massClear"],
  info: "deletes all messages in all channels",
  usage: "clearAllMessages",
  async execute(message) {
    await message.delete();
    const confirmMessage = await message.channel.send(
      "⚠️ Are you sure you want to delete **ALL MESSAGES** in all channels? Type `confirm` to proceed.",
    );
    const filter = (response) =>
      response.author.id === message.author.id &&
      response.content.toLowerCase() === "confirm";
    const collector = confirmMessage.channel.createMessageCollector({
      filter,
      time: 10000,
    });
    collector.on("collect", async () => {
      confirmMessage.edit("Deleting all messages in all channels...");
      message.guild.channels.cache
        .filter(async (channel) => channel.isText())
        .forEach(async (channel) => {
          channel.messages.fetch({ limit: 100 }).then((messages) => {
            messages.forEach((msg) => msg.delete().catch(console.error));
          });
        });
      confirmMessage.edit("✅ All messages deleted.");
      logger_1.default.cmd("All messages deleted in all channels by user.");
    });
  },
};
