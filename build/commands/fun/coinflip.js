"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "coinflip",
  aliases: ["cf"],
  info: "flips a coin",
  usage: "coinflip",
  execute(message) {
    message.channel
      .send("Flipping a coin... 🪙")
      .then(async (coinflipMessage) => {
        const coin = Math.random() < 0.5 ? "Heads" : "Tails";
        const messages = [
          "Almost there... 🌀",
          "The coin is in the air... 🌪️",
          "The result is coming... 🕒",
        ];
        let editCount = 0;
        const editInterval = setInterval(async () => {
          if (editCount < messages.length) {
            await coinflipMessage.edit(messages[editCount]);
            editCount++;
          } else {
            await coinflipMessage.edit(`🪙 **Coinflip Result:** ${coin}`);
            clearInterval(editInterval);
          }
        }, 1000);
        if (message.author.id == message.client.user.id)
          message.delete().catch(() => {});
        logger_1.default.cmd(
          `Coinflip Command has been executed and Result is ${coin}`,
        );
      });
  },
};
