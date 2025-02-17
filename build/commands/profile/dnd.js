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
  name: "dnd",
  aliases: ["donotdisturb", "dndmode"],
  info: "sets your bot to DND mode",
  usage: "dnd [reason]",
  async execute(message, args) {
    message.delete();
    await bot_1.client.user.setActivity(null);
    const reason = args.join(" ") || "Do Not Disturb";
    await bot_1.client.user.setPresence({
      activities: [{ name: reason }],
      status: "dnd",
    });
    message.channel.send(
      `🔴 ${message.isOwnMessage ? "You are" : "I am"} now in Do Not Disturb mode: **${reason}**`,
    );
    logger_1.default.status("Set DND with reason: " + reason);
  },
};
