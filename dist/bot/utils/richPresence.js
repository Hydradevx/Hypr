import { RichPresence } from "discord.js-selfbot-v13";
import logger from "./logger.js";
const defaultRpc = {
    applicationId: "1325482563908927620",
    type: "PLAYING",
    name: "Hydrion S3LFB0T",
    details: "Using Selfbot",
    largeImageKey: "icon",
    largeImageText: "Hydrion S3LFB0T",
    buttons: [
        {
            label: "Self Bot 🤖",
            url: "https://github.com/Hydrion-Tools/Hydrion-S3LFB0T",
        },
        {
            label: "Discord 💬",
            url: "https://discord.gg/6Tufbvnebj",
        },
    ],
};
let currentRpc = defaultRpc;
export function getCurrentRpc() {
    return currentRpc;
}
export function setRichPresence(client, data) {
    if (!client || !client.user)
        return;
    currentRpc = { ...defaultRpc, ...data };
    const status = new RichPresence(client)
        .setApplicationId(currentRpc.applicationId)
        .setType(currentRpc.type)
        .setName(currentRpc.name)
        .setDetails(currentRpc.details)
        .setStartTimestamp(Date.now())
        .setAssetsLargeImage(currentRpc.largeImageKey)
        .setAssetsLargeText(currentRpc.largeImageText);
    currentRpc.buttons?.forEach((b) => status.addButton(b.label, b.url));
    client.user.setActivity(status);
    logger.status("RPC Started");
}
