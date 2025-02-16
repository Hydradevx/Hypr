"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = rpc;
const { RichPresence, Client } = require("discord.js-selfbot-v13");
const logger_1 = __importDefault(require("./logger"));
function rpc(client) {
  if (!client || !client.user) {
    console.error("Client is not initialized or logged in.");
    return;
  }
  const status = new RichPresence(client)
    .setApplicationId("1325482563908927620")
    .setType("PLAYING")
    .setName("Hydrion S3LFB0T")
    .setDetails("Using Selfbot")
    .setStartTimestamp(Date.now())
    .setAssetsLargeImage("icon")
    .setAssetsLargeText("Hydrion S3LFB0T")
    .addButton(
      "Self Bot 🤖",
      "https://github.com/Hydrion-Tools/Hydrion-S3LFB0T",
    )
    .addButton("Discord 💬", "https://discord.gg/6Tufbvnebj");
  client.user.setActivity(status);
  logger_1.default.status("Started Discord RPC");
}
