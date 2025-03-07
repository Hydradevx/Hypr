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
  name: "listen",
  aliases: ["startlisten", "setlisten"],
  info: "sets the user to listen to a song",
  usage: "listen [song]",
  async execute(message, args) {
    message.delete();
    const activityDescription = args.join(" ");
    if (activityDescription) {
      await bot_1.client.user.setActivity(activityDescription, {
        type: "LISTENING",
      });
      message.channel.send(
        `🎶 ${message.isOwnMessage ? "You are" : "I am"} now listening to **${activityDescription}**!`,
      );
      logger_1.default.status(
        `Listening set with song: ${activityDescription}`,
      );
    } else {
      message.channel.send("❌ Please provide a song description.");
    }
  },
};
