"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "ping",
  aliases: ["p"],
  info: "Returns the ping of the Selfbot",
  usage: `ping`,
  execute(message) {
    message.channel.send(
      `🏓 Ping is ${message.createdTimestamp - Date.now()}ms!`,
    );
    logger_1.default.cmd(
      `Ping Command has been excuted and ping is ${message.createdTimestamp - Date.now()}ms`,
    );
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
  },
};
