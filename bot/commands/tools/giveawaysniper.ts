import logger from "../../utils/logger";

const giveawayBots = [
  "294882584201003009", // GiveawayBot
  "487258918465306634", // MEE6
  "682545333183471616", // Giveaway Boat
  "396464677032427530", // Disboard (rarely used for giveaways)
];

export default {
  name: "giveawaysniper",
  aliases: ["gs"],
  enabled: false,
  execute(message: any) {
    this.enabled = !this.enabled;
    message.channel.send(
      `🎁 **Giveaway Sniper is now ${this.enabled ? "ACTIVE" : "DISABLED"}!**`,
    );
    logger.cmd(`Giveaway Sniper ${this.enabled ? "activated" : "deactivated"}`);
    message.delete();
  },
};

export function setupGiveawaySniper(client: any) {
  client.on("messageCreate", async (message: any) => {
    if (!module.exports.enabled || !giveawayBots.includes(message.author.id))
      return;
    if (!message.content.toLowerCase().includes("react with 🎉 to enter"))
      return;

    try {
      await message.react("🎉");
      logger.cmd(
        `🎁 Entered a giveaway in #${message.channel.name} (${message.guild?.name})`,
      );
    } catch {
      logger.warn(`❌ Failed to enter giveaway in #${message.channel.name}`);
    }
  });
}
