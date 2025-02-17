"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "8ball",
  aliases: ["eightball"],
  info: "asks the eightball a questions",
  usage: "8ball",
  execute(message) {
    message.channel
      .send("Shaking the Magic 8-Ball... 🎱")
      .then((ballMessage) => {
        const responses = [
          "Yes, definitely!",
          "No way!",
          "Maybe...",
          "It’s possible.",
          "I wouldn't count on it.",
          "Absolutely!",
          "The future is unclear.",
          "Signs point to yes.",
          "Ask again later.",
        ];
        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)];
        const messages = [
          "Hmm... Let me think... 🤔",
          "The 8-Ball is preparing an answer... 🔮",
          "Almost there... 🌌",
        ];
        let editCount = 0;
        const editInterval = setInterval(async () => {
          if (editCount < messages.length) {
            await ballMessage.edit(messages[editCount]);
            editCount++;
          } else {
            await ballMessage.edit(`🎱 **8-Ball:** ${randomResponse}`);
            clearInterval(editInterval);
          }
        }, 1000);
        message.delete();
        logger_1.default.cmd(
          `8Ball Command has been executed and Result is: ${randomResponse}`,
        );
      });
  },
};
