import fs from "fs";
import path from "path";

const configPath = path.join(__dirname, "./autoReactConfig.json");
let autoReactConfig: { [key: string]: string[] } = {};

function loadConfig() {
  try {
    autoReactConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
  } catch {}
}

export function setupAutoReact(client: any) {
  loadConfig();

  client.on("messageCreate", async (message: any) => {
    if (message.author.bot || !message.guild) return;

    for (const trigger in autoReactConfig) {
      if (message.content.toLowerCase().includes(trigger)) {
        for (const emoji of autoReactConfig[trigger]) {
          await message.react(emoji).catch(() => {});
        }
        break;
      }
    }
  });
}
