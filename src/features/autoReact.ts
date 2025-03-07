import fs from "fs";
import path from "path";

const configPath = path.join(__dirname, "../../autoReact.json");
let autoReactConfig: { [key: string]: string } = {};

function loadConfig() {
  try {
    autoReactConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
  } catch (error) {
    console.error("Failed to load autoReactConfig:", error);
  }
}

export function setupAutoReact(client: any) {
  loadConfig();

  client.on("messageCreate", async (message: any) => {
    if (message.author.bot || !message.guild) return;

    for (const word of message.content.toLowerCase().split(/\s+/)) {
      if (autoReactConfig[word]) {
        await message.react(autoReactConfig[word]).catch(() => {});
      }
    }
  });
}
