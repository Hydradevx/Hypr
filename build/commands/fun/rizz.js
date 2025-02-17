"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "rizz",
  aliases: ["pickup", "flirt"],
  info: "Rizzes up someone",
  usage: "rizz [@user]",
  async execute(message, args) {
    if (message.author.id === message.client.user?.id) {
      message.delete().catch(() => {});
    }
    const mentionedUser = message.mentions.users.first() || args[0];
    const userToSendLine = mentionedUser || message.author;
    try {
      const response = await axios_1.default.get(
        "https://api.quotable.io/random?tags=love",
      );
      const pickupLine = response.data.content;
      const messages = [
        "Finding the perfect rizz line... 🤔",
        "Hold on... this one is special! 🕒",
        "Almost there... just one more second! ⏳",
        "Ready to rizz up? 😏",
      ];
      const rizzMessage = await message.channel.send(messages[0]);
      logger_1.default.cmd(
        `Rizz Command has been executed and Result is ${pickupLine}`,
      );
      let editCount = 1;
      const editInterval = setInterval(async () => {
        if (editCount < messages.length) {
          await rizzMessage.edit(messages[editCount]);
          editCount++;
        } else {
          await rizzMessage.edit(
            `✨ **Rizz Line for ${userToSendLine}:** ${pickupLine}`,
          );
          clearInterval(editInterval);
        }
      }, 1000);
    } catch (error) {
      logger_1.default.error(`Failed to fetch a rizz line: ${error.message}`);
      message.channel.send(
        "Oops! Couldn't fetch a rizz line at the moment. 😢",
      );
    }
  },
};
