import chalk from "chalk";
import { readFile } from "fs/promises";

const Json = JSON.parse(
  await readFile(new URL("../../../package.json", import.meta.url), "utf-8")
);

let logs: string[] = [];
const maxLogs = process.stdout.rows - 10;

const logBuffer: string[] = [];

const log = (message: string) => {
  logs.push(message);
  logBuffer.push(stripAnsi(message));
  console.log(message);
  renderLogs();
};

function stripAnsi(str: string): string {
  return str.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    ""
  );
}

function renderLogs() {
  displayTextArt();
  console.log(chalk.green("\nLogs:\n"));
  const logsToShow = logs.slice(-maxLogs);
  logsToShow.forEach((line) => console.log(line));
}

function displayTextArt() {
  const art = `
    ${chalk.cyanBright("██╗░░██╗██╗░░░██╗██████╗░██████╗░██╗░█████╗░███╗░░██╗")}
    ${chalk.cyanBright("██║░░██║╚██╗░██╔╝██╔══██╗██╔══██╗██║██╔══██╗████╗░██║")}
    ${chalk.cyanBright("███████║░╚████╔╝░██║░░██║██████╔╝██║██║░░██║██╔██╗██║")}
    ${chalk.cyanBright("██╔══██║░░╚██╔╝░░██║░░██║██╔══██╗██║██║░░██║██║╚████║")}
    ${chalk.cyanBright("██║░░██║░░░██║░░░██████╔╝██║░░██║██║╚█████╔╝██║░╚███║")}
    ${chalk.cyanBright(`╚═╝░░╚═╝░░░╚═╝░░░╚═════╝░╚═╝░░╚═╝╚═╝░╚════╝░╚═╝░░╚══╝`)}
    ${chalk.cyanBright(`SELFBOT v${Json.version}`)}
  `;
  console.clear();
  console.log(art);
}

function getLogs(): string[] {
  return logBuffer.slice(-100);
}

function initLogger() {
  log(chalk.green("Logger initialized."));
}

export default {
  status: (msg: string) => log(chalk.cyan(`[STATUS] ${msg}`)),
  error: (msg: string) => log(chalk.red(`[ERROR] ${msg}`)),
  warn: (msg: string) => log(chalk.yellow(`[WARN] ${msg}`)),
  info: (msg: string) => log(chalk.blue(`[INFO] ${msg}`)),
  cmd: (msg: string) => log(chalk.magenta(`[COMMAND] ${msg}`)),
  wlog: (msg: string) => log(chalk.white(`[LOG] ${msg}`)),
  initLogger,
  getLogs,
};