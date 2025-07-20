import fs from "fs";
import path from "path";
import readline from "readline";
import chalk from "chalk";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const textArt = `
    ${chalk.cyanBright("██╗░░██╗██╗░░░██╗██████╗░██████╗░██╗░█████╗░███╗░░██╗")}
    ${chalk.cyanBright("██║░░██║╚██╗░██╔╝██╔══██╗██╔══██╗██║██╔══██╗████╗░██║")}
    ${chalk.cyanBright("███████║░╚████╔╝░██║░░██║██████╔╝██║██║░░██║██╔██╗██║")}
    ${chalk.cyanBright("██╔══██║░░╚██╔╝░░██║░░██║██╔══██╗██║██║░░██║██║╚████║")}
    ${chalk.cyanBright("██║░░██║░░░██║░░░██████╔╝██║░░██║██║╚█████╔╝██║░╚███║")}
    ${chalk.cyanBright("╚═╝░░╚═╝░░░╚═╝░░░╚═════╝░╚═╝░░╚═╝╚═╝░╚════╝░╚═╝░░╚══╝")}
    ${chalk.cyanBright("SELFBOT Configurator")}
`;

console.log(textArt);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askTrueorFalse = (question: string): Promise<boolean> => {
  return new Promise((resolve) => {
    rl.question(chalk.yellow(question + ' (y/n): '), (answer: string) => {
      const normalized = answer.trim().toLowerCase();
      resolve(normalized === 'y' || normalized === 'yes');
    });
  });
};

const askInput = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(chalk.cyan(question + ": "), (answer: string) => {
      resolve(answer.trim());
    });
  });
};

async function configure() {
  const config = {
    token: await askInput("Enter your bot token"),
    prefix: await askInput("Enter your command prefix"),
    safetyTime: await askInput("Enter the safety(Auto-Delete) time in seconds"),
    WebUI: await askTrueorFalse("Would you like to enable Web UI?"),
    rpc: await askTrueorFalse("Would you like to enable Discord RPC?"),
    autoreact: await askTrueorFalse("Would you like to enable auto react?")
  };

  const configPath = path.join(__dirname, "../../../config.json");
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");

  console.log(chalk.green("Configuration saved successfully!"));
  rl.close();
}

configure();
