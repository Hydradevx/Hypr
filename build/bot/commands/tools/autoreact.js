import logger from "../../utils/logger";
import autoReactState from "../../managers/autoReactState";
export default {
    name: "autoreact",
    aliases: [
        "enableautoreact",
        "disableautoreact",
        "enablereact",
        "disablereact",
    ],
    info: "Toggles the Auto-Reaction Feature",
    usage: "autoreact",
    execute(message) {
        const isEnabled = autoReactState.getStatus();
        if (isEnabled) {
            autoReactState.disable();
            message.channel.send(`Auto React has been disabled ❌`);
        }
        else {
            autoReactState.enable();
            message.channel.send(`Auto React has been enabled ✅`);
        }
        logger.cmd(`Auto React has been ${isEnabled ? "disabled" : "enabled"}`);
        message.delete();
    },
};
