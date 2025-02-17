"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("../../bot");
const richPresence_1 = __importDefault(require("../../utils/richPresence"));
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "stopactivity",
  aliases: ["stopactivity", "clearactivity"],
  info: "clears the user's current activity",
  usage: "stopactivity",
  async execute(message, args) {
    await bot_1.client.user.setActivity(null);
    message.delete();
    message.chanel.send("Activity cleared.");
    logger_1.default.status("Activity cleared.");
    await (0, richPresence_1.default)(bot_1.client);
  },
};
