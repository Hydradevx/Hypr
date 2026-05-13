import axios from "axios";
import logger from "../../utils/logger.ts";

export default {
  name: "nitrosniper",
  aliases: ["ns"],
  enabled: false,
  execute(message: any, args: any, client: any, prefix: string) {
    this.enabled = !this.enabled;
    message.channel.send(
      `🎁 **Nitro Sniper is now ${this.enabled ? "ACTIVE" : "DISABLED"}!**`,
    );
    logger.cmd(`Nitro Sniper ${this.enabled ? "activated" : "deactivated"}`);
    if (this.enabled) {
      startNitroSniper(client);
    }
    message.delete();
  },
};

function startNitroSniper(client: any) {
  client.on("messageCreate", async (message: any) => {
    if (
      !module.exports.enabled ||
      message.author.bot ||
      !message.content.includes("discord.gift/")
    )
      return;

    const nitroCode = message.content.match(
      /discord\.gift\/([a-zA-Z0-9]+)/,
    )?.[1];
    if (!nitroCode) return;

    logger.info(`🎁 Nitro link detected: discord.gift/${nitroCode}`);

    try {
      const response = await axios.post(
        `https://discord.com/api/v9/entitlements/gift-codes/${nitroCode}/redeem`,
        {},
        {
          headers: {
            Authorization: client.token,
            "User-Agent": "Mozilla/5.0",
          },
        },
      );

      if (response.status === 200) {
        message.channel.send(`✅ **Successfully claimed Nitro!**`);
        logger.status(
          `✅ Successfully claimed Nitro: discord.gift/${nitroCode}`,
        );
      } else {
        message.channel.send(`❌ **Failed to claim Nitro.**`);
        logger.warn(`❌ Failed to claim Nitro: discord.gift/${nitroCode}`);
      }
    } catch (error: any) {
      message.channel.send(`❌ **Nitro claim failed.**`);
      logger.error(`❌ Error claiming Nitro: ${error.message}`);
    }
  });
}
