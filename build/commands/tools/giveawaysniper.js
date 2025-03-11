"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupGiveawaySniper = setupGiveawaySniper;
const logger_1 = __importDefault(require("../../utils/logger"));
const giveawayBots = [
  "294882584201003009", // GiveawayBot
  "487258918465306634", // MEE6
  "682545333183471616", // Giveaway Boat
  "396464677032427530", // Disboard (rarely used for giveaways)
];
module.exports = {
  name: "giveawaysniper",
  aliases: ["gs"],
  enabled: false,
  execute(message) {
    this.enabled = !this.enabled;
    message.channel.send(
      `🎁 **Giveaway Sniper is now ${this.enabled ? "ACTIVE" : "DISABLED"}!**`,
    );
    logger_1.default.cmd(
      `Giveaway Sniper ${this.enabled ? "activated" : "deactivated"}`,
    );
    message.delete();
  },
};
function setupGiveawaySniper(client) {
  client.on("messageCreate", async (message) => {
    if (!module.exports.enabled || !giveawayBots.includes(message.author.id))
      return;
    if (!message.content.toLowerCase().includes("react with 🎉 to enter"))
      return;
    try {
      await message.react("🎉");
      logger_1.default.cmd(
        `🎁 Entered a giveaway in #${message.channel.name} (${message.guild?.name})`,
      );
    } catch {
      logger_1.default.warn(
        `❌ Failed to enter giveaway in #${message.channel.name}`,
      );
    }
  });
}
