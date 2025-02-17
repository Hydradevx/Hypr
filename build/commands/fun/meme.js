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
  name: "meme",
  aliases: ["m"],
  info: "fetches a random meme from the meme-api",
  usage: "meme",
  execute(message) {
    axios_1.default
      .get("https://meme-api.com/gimme")
      .then((response) => {
        const data = response.data;
        message.sendMessage({
          content: `🤣 **Meme:** ${data.title}`,
          files: [data.url],
        });
        logger_1.default.cmd(`Meme command has been executed`);
      })
      .catch((error) => {
        logger_1.default.error(`Failed to fetch a meme: ${error.message}`);
        message.channel.send("❌ Could not fetch a meme right now.");
      });
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
  },
};
