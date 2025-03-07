"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("../../bot");
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "stream",
  aliases: ["startstream", "setstream"],
  info: "sets the user's streaming status",
  usage: "stream [streaming description]",
  async execute(message, args) {
    message.delete();
    const activityDescription = args.join(" ");
    if (activityDescription) {
      await bot_1.client.user.setActivity(activityDescription, {
        type: "STREAMING",
        url: "https://www.twitch.tv/your_channel",
      });
      message.channel.send(
        `🎥 You are now streaming **${activityDescription}**!`,
      );
      logger_1.default.status(
        `Streaming set with title: ${activityDescription}`,
      );
    } else {
      message.channel.send("❌ Please provide a streaming description.");
    }
  },
};
