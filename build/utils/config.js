import fs from "fs";
import path from "path";
import readline from "readline";
import colors from "ansi-colors";
import { fileURLToPath } from "url";
// Fix for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const textArt = `
    ${colors.cyanBright("██╗░░██╗██╗░░░██╗██████╗░██████╗░██╗░█████╗░███╗░░██╗")}
    ${colors.cyanBright("██║░░██║╚██╗░██╔╝██╔══██╗██╔══██╗██║██╔══██╗████╗░██║")}
    ${colors.cyanBright("███████║░╚████╔╝░██║░░██║██████╔╝██║██║░░██║██╔██╗██║")}
    ${colors.cyanBright("██╔══██║░░╚██╔╝░░██║░░██║██╔══██╗██║██║░░██║██║╚████║")}
    ${colors.cyanBright("██║░░██║░░░██║░░░██████╔╝██║░░██║██║╚█████╔╝██║░╚███║")}
    ${colors.cyanBright("╚═╝░░╚═╝░░░╚═╝░░░╚═════╝░╚═╝░░╚═╝╚═╝░╚════╝░╚═╝░░╚══╝")}
    ${colors.cyanBright("SELFBOT Configurator")}
`;
console.log(textArt);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const askInput = (question) => {
  return new Promise((resolve) => {
    rl.question(colors.cyan(question + ": "), (answer) => {
      resolve(answer.trim());
    });
  });
};
async function configure() {
  const config = {
    token: await askInput("Enter your bot token"),
    prefix: await askInput("Enter your command prefix"),
  };
  const configPath = path.join(__dirname, "../../config.json");
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");
  console.log(colors.green("Configuration saved successfully!"));
  rl.close();
}
configure();
