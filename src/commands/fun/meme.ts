import axios from "axios";
import logger from "../../utils/logger";

module.exports = {
  name: "meme",
  aliases: ["m"],
  info: "fetches a random meme from the meme-api",
  usage: "meme",
  execute(message: any) {
    axios
      .get("https://meme-api.com/gimme")
      .then((response) => {
        const data = response.data;
        message.sendMessage({
          content: `🤣 **Meme:** ${data.title}`,
          files: [data.url],
        });
        logger.cmd(`Meme command has been executed`);
      })
      .catch((error) => {
        logger.error(`Failed to fetch a meme: ${error.message}`);
        message.channel.send("❌ Could not fetch a meme right now.");
      });
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
  },
};
