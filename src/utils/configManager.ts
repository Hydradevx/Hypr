import fs from "fs";
import inquirer from "inquirer";

const CONFIG_FILE = "config.json";

const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

type BotConfig = { botToken: string; prefix: string };
type ConfigData = { configs: Record<string, BotConfig> };

function loadConfig(): ConfigData {
  if (!fs.existsSync(CONFIG_FILE)) {
    console.log(
      `${colors.yellow}Config file not found. Creating a new one...${colors.reset}`,
    );
    const defaultConfig: ConfigData = {
      configs: { default: { botToken: "", prefix: "!" } },
    };
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(defaultConfig, null, 2));
  }
  return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
}

function saveConfig(data: ConfigData): void {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2));
}

async function showConfigs(): Promise<BotConfig | any> {
  if (!fs.existsSync(CONFIG_FILE)) return null;
  const configData = loadConfig();
  const configNames = Object.keys(configData.configs);

  const { selectedOption } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedOption",
      message: `${colors.blue}Select a configuration:${colors.reset}`,
      choices: [
        ...configNames,
        new inquirer.Separator(),
        "➕ Create New Config",
        "❌ Exit",
      ],
    },
  ]);

  if (selectedOption === "➕ Create New Config") return createNewConfig();
  if (selectedOption === "❌ Exit") {
    console.log(`${colors.red}Exiting...${colors.reset}`);
    process.exit(0);
  }
  return manageConfig(selectedOption);
}

async function createNewConfig(): Promise<BotConfig | undefined> {
  const configData = loadConfig();

  const { name } = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: `${colors.green}Enter a name for the new config:${colors.reset}`,
      validate: (input: string) =>
        configData.configs[input] ? "Config name already exists!" : true,
    },
  ]);

  configData.configs[name] = { botToken: "", prefix: "!" };
  saveConfig(configData);
  console.log(`${colors.green}New config '${name}' created!${colors.reset}`);

  return showConfigs();
}

async function manageConfig(
  configName: string,
): Promise<BotConfig | undefined> {
  console.log(`${colors.cyan}\nSelected Config: ${configName}${colors.reset}`);

  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: `${colors.yellow}Choose an option:${colors.reset}`,
      choices: ["🚀 Run this config", "✏️ Edit this config", "🔙 Go back"],
    },
  ]);

  if (action === "🚀 Run this config") {
    console.log(
      `${colors.green}Running bot with config: ${configName}${colors.reset}`,
    );
    return loadConfig().configs[configName];
  }
  if (action === "✏️ Edit this config") return editConfig(configName);
  return showConfigs();
}

async function editConfig(configName: string): Promise<BotConfig | undefined> {
  const configData = loadConfig();
  const selectedConfig = configData.configs[configName];

  const responses = await inquirer.prompt([
    {
      type: "input",
      name: "botToken",
      message: "Bot Token:",
      default: selectedConfig.botToken,
    },
    {
      type: "input",
      name: "prefix",
      message: "Prefix:",
      default: selectedConfig.prefix,
    },
  ]);

  configData.configs[configName] = responses;
  saveConfig(configData);

  console.log(`${colors.green}Config updated successfully!${colors.reset}`);
  return manageConfig(configName);
}

export default showConfigs;
