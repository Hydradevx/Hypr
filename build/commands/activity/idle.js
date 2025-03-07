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
  name: "idle",
  aliases: ["idlemode"],
  info: "sets the user to idle mode",
  usage: "idle [description]",
  async execute(message, args) {
    message.delete();
    const description = args.join(" ") || "Idle";
    await bot_1.client.user.setActivity(null);
    await bot_1.client.user.setPresence({
      activities: [{ name: description }],
      status: "idle",
    });
    message.channel.send(
      `🌙 ${message.isOwnMessage ? "You are" : "I am"} now idle: **${description}**`,
    );
    logger_1.default.status("Set Idle mode with description: " + description);
  },
};
