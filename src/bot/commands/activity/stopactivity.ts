import { client } from "../../../bot";
import { setRichPresence as rpc } from "../../utils/richPresence";
import logger from "../../utils/logger";

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
