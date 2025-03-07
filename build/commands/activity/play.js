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
  name: "play",
  aliases: ["game", "playGame", "setGame"],
  info: "sets the user to play a game",
  usage: "play [game]",
  async execute(message, args) {
    message.delete();
    await bot_1.client.user.setActivity(null);
    const activityDescription = args.join(" ");
    if (activityDescription) {
      await bot_1.client.user.setActivity(activityDescription, {
        type: "PLAYING",
      });
      message.channel.send(
        `🎮 ${message.isOwnMessage ? "You are" : "I am"} now playing **${activityDescription}**!`,
      );
      logger_1.default.cmd(
        `User set their activity to playing: ${activityDescription}`,
      );
    } else {
      message.channel.send("❌ Please provide a game description.");
      logger_1.default.error(
        "User attempted to set activity without providing a description.",
      );
    }
  },
};
