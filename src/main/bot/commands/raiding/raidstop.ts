import logger from "../../utils/logger.ts";
import raidState from "../../managers/raidState.ts";

export default {
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
