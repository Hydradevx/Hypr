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
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "listallcommands",
  aliases: ["listall", "listcommand", "listcommands", "listallcommand"],
  info: "Displays all available commands",
  usage: "listallcommands",
  async execute(message) {
    await message.delete();
    function getFilesRecursively(directory) {
      let files = [];
      const items = fs.readdirSync(directory, { withFileTypes: true });
      for (const item of items) {
        const fullPath = path.join(directory, item.name);
        if (item.isDirectory()) {
          files = files.concat(getFilesRecursively(fullPath));
        } else if (item.isFile() && fullPath.endsWith(".js")) {
          files.push(fullPath);
        }
      }
      return files;
    }
    const commandsPath = path.join(__dirname, "../");
    const commandFiles = getFilesRecursively(commandsPath);
    let commandNames = [];
    for (const filePath of commandFiles) {
      try {
        const command = require(filePath);
        if (command.name) commandNames.push(command.name);
      } catch (error) {
        logger_1.default.error(
          `Failed to load command at ${filePath}: ${error.message}`,
        );
      }
    }
    if (commandNames.length === 0)
      return message.channel.send("❌ No commands found.");
    const commandCount = commandNames.length;
    const chunkSize = 1950;
    let currentMessage = `🌟 **Wow! There are a total of \`${commandCount}\` commands available.** 🌟\n\n📚 **Available Commands:**\n`;
    for (const command of commandNames) {
      if ((currentMessage + `\n• ${command}`).length > chunkSize) {
        await message.channel.send(currentMessage);
        currentMessage = "📚 **Available Commands (continued):**\n";
      }
      currentMessage += `\n• ${command}`;
    }
    if (currentMessage) await message.channel.send(currentMessage);
    logger_1.default.cmd("List All Commands Command has been executed");
  },
};
