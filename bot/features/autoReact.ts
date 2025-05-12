import fs from "fs";
import path from "path";
import autoReactState from "../managers/autoReactState";

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

  client.on("messageCreate", (message: any) => {
    if (message.author.bot || !message.guild || !autoReactState.getStatus())
      return;

    const words = message.content.toLowerCase().split(/\s+/);
    const reactions = new Set<string>();

    for (const word of words) {
      if (autoReactConfig[word]) {
        reactions.add(autoReactConfig[word]);
      }
    }

    reactions.forEach(async (reaction) => {
      try {
        await message.react(reaction);
      } catch {}
    });
  });
}
