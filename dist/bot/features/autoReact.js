import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import autoReactState from "../managers/autoReactState.js";
const configPath = path.join(__dirname, "../../../autoReact.json");
let autoReactConfig = {};
function loadConfig() {
    try {
        autoReactConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
    }
    catch (error) {
        console.error("Failed to load autoReactConfig:", error);
    }
}
export function setupAutoReact(client) {
    loadConfig();
    client.on("messageCreate", (message) => {
        if (message.author.bot || !message.guild || !autoReactState.getStatus())
            return;
        const words = message.content.toLowerCase().split(/\s+/);
        const reactions = new Set();
        for (const word of words) {
            if (autoReactConfig[word]) {
                reactions.add(autoReactConfig[word]);
            }
        }
        reactions.forEach(async (reaction) => {
            try {
                await message.react(reaction);
            }
            catch { }
        });
    });
}
