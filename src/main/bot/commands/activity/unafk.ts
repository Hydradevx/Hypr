import afkState from "../../managers/afkState.ts";
import logger from "../../utils/logger.ts";

export default {
  name: "unafk",
  aliases: ["back", "removeafk"],
  info: "removes AFK status",
  usage: "unafk",

  async execute(message: any) {
    await message.delete().catch(() => {});

    if (!afkState.getAfkStatus()) {
      return message.channel.send("❌ You are not AFK.");
    }

    afkState.status = false;
    afkState.setAfkReason("");
    afkState.setAfkStartTime(null);

    message.channel.send("✅ AFK removed.");

    logger.status("AFK removed");
  },
};
