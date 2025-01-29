const { Message, Client } = require("discord.js-selfbot-v13");

module.exports = {
  name: "stopactivity",
  aliases: ["stopactivity", "clearactivity"],
  info: "clears the user's current activity",
  usage: "stopactivity",
  /**
   *
   * @param {Message} message
   * @param {string[]} _args
   * @param {Client} client
   */
  async execute(message, _args, client) {
    if (message.isOwnMessage)
      message.delete().catch(() => {});
    await client.user.setActivity(null);
    
    message.sendMessage("Activity cleared.").catch(() => {});
    console.log("Activity cleared.");
    // await rpc(client);
  },
};
