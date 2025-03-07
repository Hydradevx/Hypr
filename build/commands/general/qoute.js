"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "quote",
  aliases: ["addquote"],
  info: "quotes your message",
  usage: "qoute [message]",
  async execute(message, args) {
    message.delete();
    const quote = args.join(" ");
    if (!quote) return message.channel.send("❌ Please provide a quote.");
    message.channel.send(`💬 **Quote:** "${quote}"`);
    logger_1.default.cmd(`Quote added: "${quote}"`);
  },
};
