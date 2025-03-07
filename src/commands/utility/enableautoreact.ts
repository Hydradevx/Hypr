import logger from "../../utils/logger";
import autoReactState from "../../managers/autoReactState";

module.exports = {
  name: "enableautoreact",
  aliases: ["enablereact"],
  info: "Enables Auto-react Feature",
  usage: `enableautoreact`,
  execute(message: any) {
    autoReactState.enable();
    message.channel.send(`Auto React has been enabled ✅`);
    logger.cmd(`Auto React has been enabled ✅`);
    message.delete();
  },
};
