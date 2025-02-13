"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const inquirer_1 = __importDefault(require("inquirer"));
const CONFIG_FILE = "config.json";
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};
function loadConfig() {
  if (!fs_1.default.existsSync(CONFIG_FILE)) {
    console.log(
      `${colors.yellow}Config file not found. Creating a new one...${colors.reset}`,
    );
    createNewConfig();
  }
  return JSON.parse(fs_1.default.readFileSync(CONFIG_FILE, "utf-8"));
}
function saveConfig(data) {
  fs_1.default.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2));
}
async function showConfigs() {
  if (!fs_1.default.existsSync(CONFIG_FILE)) return null;
  const configData = loadConfig();
  const configNames = Object.keys(configData.configs);
  const { selectedOption } = await inquirer_1.default.prompt([
    {
      type: "list",
      name: "selectedOption",
      message: `${colors.blue}Select a configuration:${colors.reset}`,
      choices: [
        ...configNames,
        new inquirer_1.default.Separator(),
        "➕ Create New Config",
        "❌ Exit",
      ].filter((choice) => choice !== "default"),
    },
  ]);
  if (selectedOption === "➕ Create New Config") return createNewConfig();
  if (selectedOption === "❌ Exit") {
    console.log(`${colors.red}Exiting...${colors.reset}`);
    process.exit(0);
  }
  return manageConfig(selectedOption);
}
async function createNewConfig() {
  const configData = loadConfig();
  const { name } = await inquirer_1.default.prompt([
    {
      type: "input",
      name: "name",
      message: `${colors.green}Enter a name for the new config:${colors.reset}`,
      validate: (input) =>
        configData.configs[input] ? "Config name already exists!" : true,
    },
  ]);
  configData.configs[name] = { botToken: "", prefix: "!" };
  saveConfig(configData);
  console.log(`${colors.green}New config '${name}' created!${colors.reset}`);
  return showConfigs();
}
async function manageConfig(configName) {
  console.log(`${colors.cyan}\nSelected Config: ${configName}${colors.reset}`);
  const { action } = await inquirer_1.default.prompt([
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
async function editConfig(configName) {
  const configData = loadConfig();
  const selectedConfig = configData.configs[configName];
  const responses = await inquirer_1.default.prompt([
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
exports.default = showConfigs;
