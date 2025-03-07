"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "remind",
  aliases: ["reminder"],
  info: "sets a reminder for you",
  usage: "remind [time in minutes] [message]",
  async execute(message, args) {
    message.delete();
    const time = parseInt(args[0], 10);
    const reminderText = args.slice(1).join(" ");
    if (isNaN(time) || !reminderText) {
      return message.channel.send(
        `❌ Usage: \`${message.prefix}remind <time in minutes> <message>\``,
      );
    }
    logger_1.default.cmd(
      `Reminding : ${message.author.id} in ${time} minutes wtih ${reminderText}`,
    );
    message.channel.send(
      `⏰ Reminder set! I'll remind you in ${time} minutes.`,
    );
    setTimeout(
      () => {
        message.channel
          .send(`<@${message.author.id}> 🔔 Reminder: ${reminderText}`)
          .catch(() => {
            logger_1.default.error(`Failed to reming ${message.author.id}`);
          });
      },
      time * 60 * 1000,
    );
  },
};
