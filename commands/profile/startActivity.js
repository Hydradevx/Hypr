const { Message, Client } = require("discord.js-selfbot-v13");

const { rpc } = require("../../utils/richPresence.js");

module.exports = {
  name: "startactivity",
  aliases: ["startactivity"],
  info: "sets the user's current activity",
  usage: "startactivity",
  /**
   *
   * @param {Message} message
   * @param {string[]} _args
   * @param {Client} client
   */
  async execute(message, _args, client) {
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    console.log("Activity setting...");
    message.sendMessage("Activity starting...").catch(() => {});
    await rpc(client);
  },
};
