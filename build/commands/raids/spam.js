"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "spam",
  aliases: ["s"],
  info: "Spams a specified number of messages with a given interval",
  usage: "spam [number] [interval in ms] [message]",
  execute(message, args, prefix) {
    const count = parseInt(args[0]) || 50;
    const interval = parseInt(args[1]);
    const messageToSpam = args.slice(2).join(" ");
    if (
      isNaN(count) ||
      count <= 0 ||
      !messageToSpam ||
      isNaN(interval) ||
      interval <= 0
    ) {
      message.reply(`Usage: ${prefix}spam [number] [interval in ms] [message]`);
      return;
    }
    logger_1.default.cmd(
      `Spam Command has been executed and count is ${count} and interval is ${interval}`,
    );
    let spamCount = 0;
    let spamInterval;
    spamInterval = setInterval(() => {
      if (spamCount < count) {
        message.channel.send(messageToSpam);
        spamCount++;
      } else {
        clearInterval(spamInterval);
        spamInterval = null;
      }
    }, interval);
    message.delete();
  },
};
