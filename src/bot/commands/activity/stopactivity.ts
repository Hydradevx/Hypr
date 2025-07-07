import { client } from "../../../bot.js";
import { setRichPresence as rpc } from "../../utils/richPresence.js";
import logger from "../../utils/logger.js";

export default {
  name: "stopactivity",
  aliases: ["stopactivity", "clearactivity"],
  info: "clears the user's current activity",
  usage: "stopactivity",
  async execute(message: any) {
    await client.user.setActivity(null);
    message.delete();

    message.channel.send("Activity cleared.");
    logger.status("Activity cleared.");
    await rpc(client);
  },
};
