import { client } from "../../../bot.ts";
import { setRichPresence as rpc } from "../../utils/richPresence.ts";
import logger from "../../utils/logger.ts";

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
