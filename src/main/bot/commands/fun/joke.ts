import axios from "axios";
import logger from "../../utils/logger.js";

export default {
  name: "joke",
  aliases: ["funny", "telljoke", "jk"],
  info: "Tells a funny joke",
  usage: "joke",
  async execute(message) {
    try {
      const response = await axios.get("https://official-joke-api.appspot.com/jokes/random");
      const joke = `${response.data.setup} - ${response.data.punchline}`;

      await message.channel.send(`😂 **Joke:** ${joke}`);
      await message.delete();

      logger.cmd(`Joke Command executed. Result: ${joke}`);
    } catch (error: any) {
      logger.error(`Error fetching joke: ${error.message}`);
      await message.channel.send("❌ Couldn't fetch a joke right now. Try again later.");
    }
  },
};