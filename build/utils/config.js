"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readline_1 = __importDefault(require("readline"));
const ansi_colors_1 = __importDefault(require("ansi-colors"));
const textArt = `
    ${ansi_colors_1.default.cyanBright("██╗░░██╗██╗░░░██╗██████╗░██████╗░██╗░█████╗░███╗░░██╗")}
    ${ansi_colors_1.default.cyanBright("██║░░██║╚██╗░██╔╝██╔══██╗██╔══██╗██║██╔══██╗████╗░██║")}
    ${ansi_colors_1.default.cyanBright("███████║░╚████╔╝░██║░░██║██████╔╝██║██║░░██║██╔██╗██║")}
    ${ansi_colors_1.default.cyanBright("██╔══██║░░╚██╔╝░░██║░░██║██╔══██╗██║██║░░██║██║╚████║")}
    ${ansi_colors_1.default.cyanBright("██║░░██║░░░██║░░░██████╔╝██║░░██║██║╚█████╔╝██║░╚███║")}
    ${ansi_colors_1.default.cyanBright("╚═╝░░╚═╝░░░╚═╝░░░╚═════╝░╚═╝░░╚═╝╚═╝░╚════╝░╚═╝░░╚══╝")}
    ${ansi_colors_1.default.cyanBright("SELFBOT Configurator")}
`;
console.log(textArt);
const rl = readline_1.default.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const askInput = (question) => {
  return new Promise((resolve) => {
    rl.question(ansi_colors_1.default.cyan(question + ": "), (answer) => {
      resolve(answer.trim());
    });
  });
};
async function configure() {
  const config = {
    token: await askInput("Enter your bot token"),
    prefix: await askInput("Enter your command prefix"),
  };
  const configPath = path_1.default.join(__dirname, "../../config.json");
  fs_1.default.writeFileSync(
    configPath,
    JSON.stringify(config, null, 2),
    "utf-8",
  );
  console.log(ansi_colors_1.default.green("Configuration saved successfully!"));
  rl.close();
}
configure();
