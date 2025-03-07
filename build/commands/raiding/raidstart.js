"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
const raidState_1 = __importDefault(require("../../managers/raidState"));
module.exports = {
  name: "raidstart",
  aliases: ["startRaid", "initiateRaid"],
  info: "starts a raid",
  usage: "raidstart [message]",
  async execute(message, args, client, prefix) {
    const messageToSend = args.join(" ") || "🚨 Raid initiated! 🚨";
    const interval = 400;
    const channel = message.channel;
    await message.delete();
    if (raidState_1.default.getRaidActive()) {
      return message.reply(
        `Raid is already active! Use ${prefix}raidstop to stop it.`,
      );
    }
    raidState_1.default.setRaidActive(true);
    channel.send(
      "🔴 **Raid started!** Messages will be sent every 400 milliseconds.",
    );
    logger_1.default.cmd("Raid started with message: " + messageToSend);
    const raidInterval = setInterval(() => {
      if (raidState_1.default.getRaidActive()) {
        channel.send(messageToSend);
      }
    }, interval);
    raidState_1.default.setRaidInterval(raidInterval);
  },
};
