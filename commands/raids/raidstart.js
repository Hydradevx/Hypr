const raidState = require("../../managers/raidState.js");

module.exports = {
  name: "raidstart",
  aliases: ["startRaid", "initiateRaid"],
  info: "starts a raid",
  usage: "raidstart [message]",
  async execute(message, args) {
    const messageToSend = args.join(" ") || "🚨 Raid initiated! 🚨";
    const interval = 400;
    const channel = message.channel;

    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    if (raidState.raidActive) {
      return message.sendMessage(
        `Raid is already active! Use ${message.prefix}raidstop to stop it.`
      );
    }

    raidState.setRaidActive(true);
    channel.send(
      "🔴 **Raid started!** Messages will be sent every 400 milliseconds."
    );
   console.log("Raid started with message: " + messageToSend);

    const raidInterval = setInterval(() => {
      if (raidState.raidActive) {
        channel.send(messageToSend);
      }
    }, interval);

    raidState.setRaidInterval(raidInterval);
  },
};
