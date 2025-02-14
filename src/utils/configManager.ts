import * as fs from "fs";
import * as path from "path";
import inquirer from "inquirer";

const getConfigFilePath = (): string => {
  return path.join(__dirname, "../../config.json");
};

const readOrCreateConfigFile = (): any => {
  const configPath = getConfigFilePath();

  if (fs.existsSync(configPath)) {
    const config = fs.readFileSync(configPath, "utf-8");
    return JSON.parse(config);
  } else {
    return {};
  }
};

const askQuestions = async () => {
  const questions: any = [
    {
      type: "input",
      name: "prefix",
      message: "🧑‍💻 Enter your prefix:",
      default: "!",
    },
    {
      type: "password",
      name: "password",
      message: "🔒 Enter your token:",
    },
  ];

  const answers = await inquirer.prompt(questions);
  return answers;
};

const updateConfigFile = (newConfig: any) => {
  const configPath = getConfigFilePath();
  fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2));
  console.log("✅ Config file updated!");
};

const manageConfig = async () => {
  const configPath = getConfigFilePath();
  if (fs.existsSync(configPath)) {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "📂 Config file exists. Do you want to edit or run?",
        choices: ["✏️ Edit", "🚀 Run", "❌ Exit"],
      },
    ]);

    if (action === "✏️ Edit") {
      const userAnswers = await askQuestions();
      const existingConfig = readOrCreateConfigFile();
      const updatedConfig = { ...existingConfig, ...userAnswers };
      updateConfigFile(updatedConfig);
      return updatedConfig;
    } else if (action === "🚀 Run") {
      const existingConfig = readOrCreateConfigFile();
      return existingConfig;
    } else {
      process.exit();
    }
  } else {
    const { create } = await inquirer.prompt([
      {
        type: "confirm",
        name: "create",
        message: "❗ Config file does not exist. Do you want to create it?",
        default: true,
      },
    ]);

    if (create) {
      const userAnswers = await askQuestions();
      updateConfigFile(userAnswers);
      return userAnswers;
    } else {
      process.exit();
    }
  }
  const config: any = fs.readFileSync("../config.json");
  return config;
};

manageConfig()
  .then((config) => {
    console.log("📄 Config data:", config);
  })
  .catch((error) => {
    console.error("⚠️ Error occurred:", error);
  });

export default manageConfig;
