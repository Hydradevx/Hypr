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
  name: "disableautoreact",
  aliases: ["disableReact", "disablereact"],
  info: "Disables Auto-react Feature",
  usage: `disableautoreact`,
  execute(message) {
    autoReactState_1.default.disable();
    message.channel.send(`Auto React has been disabled ❌`);
    logger_1.default.cmd(`Auto React has been disabled ❌`);
    message.delete();
  },
};
