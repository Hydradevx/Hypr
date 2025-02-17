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
  name: "watch",
  aliases: ["startwatch", "setwatch"],
  info: "sets the user's watching status",
  usage: "watch [watching title]",
  async execute(message, args) {
    await bot_1.client.user.setActivity(null);
    message.delete();
    const activityDescription = args.join(" ");
    if (activityDescription) {
      await bot_1.client.user.setActivity(activityDescription, {
        type: "WATCHING",
      });
      message.channel.send(
        `📺  ${message.isOwnMessage ? "You are" : "I am"} now watching **${activityDescription}**!`,
      );
      logger_1.default.status(
        `Watching set with title: ${activityDescription}`,
      );
    } else {
      message.channel.send("❌ Please provide a title to watch.");
    }
  },
};
