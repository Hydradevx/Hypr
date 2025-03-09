"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "nitrosniper",
  aliases: ["ns"],
  enabled: false,
  execute(message, args, client, prefix) {
    this.enabled = !this.enabled;
    message.channel.send(
      `🎁 **Nitro Sniper is now ${this.enabled ? "ACTIVE" : "DISABLED"}!**`,
    );
    logger_1.default.cmd(
      `Nitro Sniper ${this.enabled ? "activated" : "deactivated"}`,
    );
    if (this.enabled) {
      startNitroSniper(client);
    }
    message.delete();
  },
};
function startNitroSniper(client) {
  client.on("messageCreate", async (message) => {
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
    logger_1.default.info(`🎁 Nitro link detected: discord.gift/${nitroCode}`);
    try {
      const response = await axios_1.default.post(
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
        logger_1.default.status(
          `✅ Successfully claimed Nitro: discord.gift/${nitroCode}`,
        );
      } else {
        message.channel.send(`❌ **Failed to claim Nitro.**`);
        logger_1.default.warn(
          `❌ Failed to claim Nitro: discord.gift/${nitroCode}`,
        );
      }
    } catch (error) {
      message.channel.send(`❌ **Nitro claim failed.**`);
      logger_1.default.error(`❌ Error claiming Nitro: ${error.message}`);
    }
  });
}
