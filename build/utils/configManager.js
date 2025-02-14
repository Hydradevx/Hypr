"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o)
            if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== "default") __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const inquirer_1 = __importDefault(require("inquirer"));
const getConfigFilePath = () => {
  return path.join(__dirname, "../../config.json");
};
const readOrCreateConfigFile = () => {
  const configPath = getConfigFilePath();
  if (fs.existsSync(configPath)) {
    const config = fs.readFileSync(configPath, "utf-8");
    return JSON.parse(config);
  } else {
    return {};
  }
};
const askQuestions = async () => {
  const questions = [
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
  const answers = await inquirer_1.default.prompt(questions);
  return answers;
};
const updateConfigFile = (newConfig) => {
  const configPath = getConfigFilePath();
  fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2));
  console.log("✅ Config file updated!");
};
const manageConfig = async () => {
  const configPath = getConfigFilePath();
  if (fs.existsSync(configPath)) {
    const { action } = await inquirer_1.default.prompt([
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
    const { create } = await inquirer_1.default.prompt([
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
  const config = fs.readFileSync("../config.json");
  return config;
};
manageConfig()
  .then((config) => {
    console.log("📄 Config data:", config);
  })
  .catch((error) => {
    console.error("⚠️ Error occurred:", error);
  });
exports.default = manageConfig;
