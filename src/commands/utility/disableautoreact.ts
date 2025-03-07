import logger from "../../utils/logger";
import autoReactState from "../../managers/autoReactState";

module.exports = {
  name: "disableautoreact",
  aliases: ["disableReact", "disablereact"],
  info: "Disables Auto-react Feature",
  usage: `disableautoreact`,
  execute(message: any) {
    autoReactState.disable();
    message.channel.send(`Auto React has been disabled ❌`);
    logger.cmd(`Auto React has been disabled ❌`);
    message.delete();
  },
};
