"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const configPath = path_1.default.join(__dirname, "../../../config.json");
const config = JSON.parse(fs_1.default.readFileSync(configPath, "utf-8"));
module.exports = {
  name: "setprefix",
  aliases: ["changeprefix"],
  info: "changes the prefix for the bot",
  usage: "setprefix [new prefix]",
  async execute(message, args) {
    if (args.length === 0) {
      message.channel.send("Please provide a new prefix.");
      return;
    }
    const newPrefix = args[0];
    config.prefix = newPrefix;
    fs_1.default.writeFile(
      "../../config.json",
      JSON.stringify(config, null, 2),
      (err) => {
        if (err) {
          logger_1.default.error(`Error updating prefix: ${err}`);
          message.channel.send("An error occurred while updating the prefix.");
          return;
        }
        logger_1.default.cmd(`Prefix updated to: ${newPrefix}`);
        message.channel.send(`Prefix has been updated to: \`${newPrefix}\``);
      },
    );
    message.delete();
  },
};
