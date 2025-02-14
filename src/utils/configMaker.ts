import * as fs from "fs";
import * as path from "path";
import inquirer from "inquirer";

const getConfigFilePath = (): string => {
  return path.join(__dirname, "../../config.json");
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
      name: "token",
      message: "🔒 Enter your token:",
    },
    {
      type: "input",
      name: "hasAccess",
      message: "🔑 Enter IDs of users who have access to the bot:",
    },
  ];

  const answers = await inquirer.prompt(questions);
  return answers;
};

const updateConfigFile = (newConfig: any) => {
  const configPath = getConfigFilePath();
  fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2));
  console.log("✅ Config file created!");
};

const configMake = async () => {
  const configPath = getConfigFilePath();

  if (fs.existsSync(configPath)) {
    console.log("⚠️ Config file already exists.");
    process.exit();
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
};

configMake()
  .then((config) => {
    console.log("📄 Config data:", config);
  })
  .catch((error) => {
    console.error("⚠️ Error occurred:", error);
  });

export default configMake;
