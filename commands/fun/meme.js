const axios = require("axios");

module.exports = {
  name: "meme",
  aliases: ["m"],
  info: "fetches a random meme from the meme-api",
  usage: "meme",
  execute(message) {
    axios
      .get("https://meme-api.com/gimme")
      .then((response) => {
        const data = response.data;
        message.sendMessage({
          content: `🤣 **Meme:** ${data.title}`,
          files: [data.url],
        });
        console.log(`Meme command has been executed`);
      })
      .catch((error) => {
        console.warn("Failed to fetch meme:", error);
        message.sendMessage("❌ Could not fetch a meme right now.");
      });
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
  },
};
