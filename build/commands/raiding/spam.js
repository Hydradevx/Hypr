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
  usage: "spam [number] [message]",
  execute(message, args, prefix) {
    const count = parseInt(args[0]) || 50;
    const messageToSpam = args.slice(1).join(" ");
    if (isNaN(count) || count <= 0 || !messageToSpam) {
      message.reply(`Usage: ${prefix}spam [number] [interval in ms] [message]`);
      return;
    }
    logger_1.default.cmd(
      `Spam Command has been executed and count is ${count}`,
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
    }, 10);
    message.delete();
  },
};
