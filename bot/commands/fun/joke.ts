import axios from "axios";
import logger from "../../utils/logger";

module.exports = {
  name: "joke",
  aliases: ["funny", "telljoke", "jk"],
  info: "Tells a funny joke",
  usage: "joke",
  async execute(message: any) {
    const jokeMessage = await message.channel.send(
      "Loading a funny joke... 🤔",
    );

    try {
      const response = await axios.get(
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
      logger.cmd(`Joke Command has been executed and Result is ${joke}`);
      const editInterval = setInterval(async () => {
        if (editCount < messages.length) {
          await jokeMessage.edit(messages[editCount]);
          editCount++;
        } else {
          await jokeMessage.edit(`😂 **Joke:** ${joke}`);
          clearInterval(editInterval);
        }
      }, 1000);
    } catch (error: any) {
      logger.error(`Error fetching joke: ${error.message}`);
      jokeMessage.edit("Oops! Couldn't fetch a joke at the moment. 😢");
    }

    message.delete();
  },
};
