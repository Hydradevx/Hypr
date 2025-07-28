import { Client, Collection } from "discord.js-selfbot-v13";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import update from "./bot/utils/updater.js";
import logger from "./bot/utils/logger.js";
import { usageLoad } from "./bot/utils/usageLoader.js";
import { infoLoad } from "./bot/utils/infoLoader.js";
import afkState from "./bot/managers/afkState.js";
import { setRichPresence } from "./bot/utils/richPresence.js";
import { startWebUI } from "./web.js";
import { setupAutoReact } from "./bot/features/autoReact.js";
import { antiCrash } from "./bot/utils/antiCrash.js";
import { equipInvisibilityCloak } from "./bot/features/invisibilityCloak.js";
import { pathToFileURL } from "url";
import { getConfig } from "./bot/utils/config-read.js";
let config = getConfig();
export const client = new Client();
const token = config.token;
const prefix = config.prefix || "!";
const safetyTime = config.safetyTime * 1000 || 60000 * 5;
client.commands = new Collection();
const commandsPath = path.resolve("dist/bot/commands");
function getFilesRecursively(directory) {
    let files = [];
    const items = fs.readdirSync(directory, { withFileTypes: true });
    for (const item of items) {
        const fullPath = path.join(directory, item.name);
        if (item.isDirectory()) {
            files.push(...getFilesRecursively(fullPath));
        }
        else if (item.isFile() && fullPath.endsWith(".js")) {
            files.push(fullPath);
        }
    }
    return files;
}
const commandFiles = getFilesRecursively(commandsPath);
(async () => {
    for (const filePath of commandFiles) {
        try {
            const commandModule = await import(pathToFileURL(filePath).href);
            const command = commandModule.default;
            if (command?.name) {
                client.commands.set(command.name, command);
                if (Array.isArray(command.aliases)) {
                    command.aliases.forEach((alias) => client.commands.set(alias, command));
                }
            }
        }
        catch (err) {
            console.error(err);
        }
    }
})();
client.on("ready", async () => {
    logger.status(`Logged in as ${client.user?.tag}`);
    if (config.rpc) {
        setRichPresence(client);
    }
    equipInvisibilityCloak(client);
});
client.on("messageCreate", (message) => {
    if (!config.hasAccess.includes(message.author.id) &&
        message.author.id !== client.user?.id) {
        if (afkState.afkStatus && message.mentions.has(client.user)) {
            message.reply(`💤 I'm currently AFK. Reason: ${afkState.afkReason}`);
            return;
        }
    }
    if (message.author.bot || !message.content.startsWith(prefix))
        return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();
    const command = client.commands.get(commandName);
    if (!command)
        return;
    if (message.author.id !== client.user?.id)
        return;
    const originalSend = message.channel.send.bind(message.channel);
    message.channel.send = async (...args) => {
        const sentMessage = await originalSend(...args);
        if (sentMessage) {
            setTimeout(() => {
                if (sentMessage.deletable)
                    sentMessage.delete().catch(() => { });
            }, safetyTime);
        }
    };
    setTimeout(() => {
        if (message.deletable)
            message.delete().catch(() => { });
    }, safetyTime);
    if (args[0] === "--usage") {
        usageLoad(command, message, prefix);
        return;
    }
    if (args[0] === "--info") {
        infoLoad(command, message);
        return;
    }
    command.execute(message, args, client, prefix);
});
let client_info = {
    raidsEnabled: false,
    moreCmdSoonMessage: "✨ **More Commands Coming Soon!** ✨",
};
client.info = client_info;
update();
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
sleep(100);
setupAutoReact(client);
client.login(token);
if (config.WebUI) {
    startWebUI();
}
startlogs();
function startlogs() {
    console.log(chalk.gray("Initializing logs...\n"));
    logger.initLogger();
    antiCrash();
}
