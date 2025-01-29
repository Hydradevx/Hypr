
const raidState = require("../../managers/raidState.js");

module.exports = {
  name: "raidstop",
  aliases: ["endRaid", "stopRaid"],
  info: "ends a raid",
  usage: "raidstop",
  async execute(message) {
    if (!raidState.raidActive) {
      return message.sendMessage("No active raid to stop.");
    }

    raidState.clearRaidInterval();
    raidState.setRaidActive(false);
    message.channel.send("✅ **Raid stopped!** No more messages will be sent.");
   console.log("Raid stopped.");

    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
  },
};
