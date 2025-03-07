"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
const autoReactState_1 = __importDefault(
  require("../../managers/autoReactState"),
);
module.exports = {
  name: "enableautoreact",
  aliases: ["enablereact"],
  info: "Enables Auto-react Feature",
  usage: `enableautoreact`,
  execute(message) {
    autoReactState_1.default.enable();
    message.channel.send(`Auto React has been enabled ✅`);
    logger_1.default.cmd(`Auto React has been enabled ✅`);
    message.delete();
  },
};
