import logger from "../../utils/logger.js";
import raidState from "../../managers/raidState.js";

module.exports = {
  name: "raidstop",
  aliases: ["endRaid", "stopRaid"],
  info: "ends a raid",
  usage: "raidstop",
  async execute(message: any) {
    if (!raidState.getRaidActive()) {
      return message.reply("No active raid to stop.");
    }

    raidState.clearRaidInterval();
    raidState.setRaidActive(false);
    message.channel.send("✅ **Raid stopped!** No more messages will be sent.");
    logger.cmd("Raid stopped.");
    await message.delete();
  },
};
