import axios from "axios";
import logger from "../../utils/logger.js";

export default {
  name: "rizz",
  aliases: ["pickup", "flirt"],
  info: "Rizzes up someone",
  usage: "rizz [@user]",
  async execute(message, args) {
    await message.delete();

    const mentionedUser = message.mentions.users.first() || args[0];
    const target = mentionedUser || message.author;

    try {
      const response = await axios.get("https://api.popcat.xyz/pickuplines");
      const pickupLine = response.data.pickupline;

      await message.channel.send(`✨ **Rizz Line for ${target}:** ${pickupLine}`);
      logger.cmd(`Rizz command executed for ${target}. Line: ${pickupLine}`);
    } catch (error: any) {
      logger.error(`Failed to fetch a rizz line: ${error.message}`);
      await message.channel.send("❌ Couldn't fetch a rizz line at the moment.");
    }
  },
};