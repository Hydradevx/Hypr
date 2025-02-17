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
  name: "joke",
  aliases: ["funny", "telljoke", "jk"],
  info: "Tells a funny joke",
  usage: "joke",
  async execute(message) {
    const jokeMessage = await message.channel.send(
      "Loading a funny joke... 🤔",
    );
    try {
      const response = await axios_1.default.get(
        "https://official-joke-api.appspot.com/jokes/random",
      );
      const joke = `${response.data.setup} - ${response.data.punchline}`;
      const messages = [
        "Searching for a hilarious joke... 🤔",
        "Hold on... this joke is worth the wait! 🕒",
        "Almost there... just one more second! ⏳",
        "Ready for a funny one? 😄",
      ];
      let editCount = 0;
      logger_1.default.cmd(
        `Joke Command has been executed and Result is ${joke}`,
      );
      const editInterval = setInterval(async () => {
        if (editCount < messages.length) {
          await jokeMessage.edit(messages[editCount]);
          editCount++;
        } else {
          await jokeMessage.edit(`😂 **Joke:** ${joke}`);
          clearInterval(editInterval);
        }
      }, 1000);
    } catch (error) {
      logger_1.default.error(`Error fetching joke: ${error.message}`);
      jokeMessage.edit("Oops! Couldn't fetch a joke at the moment. 😢");
    }
    message.delete();
  },
};
