"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const afkState = require("../../managers/afkState.js");
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "afk",
  aliases: ["setafk", "goafk"],
  info: "sets you as afk",
  usage: "afk [reason]",
  async execute(message, args) {
    message.delete();
    const reason = args.join(" ") || "No reason provided";
    if (afkState.afkStatus) {
      return message.channel.send("You are already AFK.");
    }
    afkState.setAfkStatus(true);
    afkState.setAfkReason(reason);
    afkState.setAfkStartTime(new Date());
    message.channel.send(
      `😴 ${message.isOwnMessage ? "You are" : "I am"} now AFK. Reason: ${reason}`,
    );
    logger_1.default.status(`AFK started with reason: ${reason}`);
  },
};
