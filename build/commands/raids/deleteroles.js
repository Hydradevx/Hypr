"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "deleteRoles",
  aliases: ["delRoles", "removeRoles"],
  info: "deletes all roles in the server",
  usage: "deleteRoles",
  async execute(message) {
    await message.delete();
    const confirmMessage = await message.channel.send(
      "⚠️ Are you sure you want to delete **ALL** roles? Type `confirm` to proceed.",
    );
    const filter = (response) =>
      response.author.id === message.author.id &&
      response.content.toLowerCase() === "confirm";
    const collector = confirmMessage.channel.createMessageCollector({
      filter,
      time: 10000,
    });
    collector.on("collect", async () => {
      confirmMessage.edit("Deleting all roles...");
      message.guild.roles.cache
        .filter((role) => role.name !== "@everyone")
        .forEach((role) => role.delete().catch(console.error));
      confirmMessage.edit("✅ All roles deleted.");
      logger_1.default.cmd("All roles deleted by user.");
    });
  },
};
