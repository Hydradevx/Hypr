import * as colors from "ansi-colors";
const Json = require("../../package.json");

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
    // ANSI escape codes
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    "",
  );
}

function renderLogs() {
  displayTextArt();
  console.log(colors.green("\nLogs:\n"));
  const logsToShow = logs.slice(-maxLogs);
  logsToShow.forEach((line) => console.log(line));
}

function displayTextArt() {
  const art = `
    ${colors.cyanBright("██╗░░██╗██╗░░░██╗██████╗░██████╗░██╗░█████╗░███╗░░██╗")}
    ${colors.cyanBright("██║░░██║╚██╗░██╔╝██╔══██╗██╔══██╗██║██╔══██╗████╗░██║")}
    ${colors.cyanBright("███████║░╚████╔╝░██║░░██║██████╔╝██║██║░░██║██╔██╗██║")}
    ${colors.cyanBright("██╔══██║░░╚██╔╝░░██║░░██║██╔══██╗██║██║░░██║██║╚████║")}
    ${colors.cyanBright("██║░░██║░░░██║░░░██████╔╝██║░░██║██║╚█████╔╝██║░╚███║")}
    ${colors.cyanBright(`╚═╝░░╚═╝░░░╚═╝░░░╚═════╝░╚═╝░░╚═╝╚═╝░╚════╝░╚═╝░░╚══╝`)}
    ${colors.cyanBright(`SELFBOT v${Json.version}`)}
  `;
  console.clear();
  console.log(art);
}

function getLogs(): string[] {
  return logBuffer.slice(-100);
}

function initLogger() {
  log(colors.green("Logger initialized."));
}

export default {
  status: (msg: string) => log(colors.cyan(`[STATUS] ${msg}`)),
  error: (msg: string) => log(colors.red(`[ERROR] ${msg}`)),
  warn: (msg: string) => log(colors.yellow(`[WARN] ${msg}`)),
  info: (msg: string) => log(colors.blue(`[INFO] ${msg}`)),
  cmd: (msg: string) => log(colors.magenta(`[COMMAND] ${msg}`)),
  wlog: (msg: string) => log(colors.white(`[LOG] ${msg}`)),
  initLogger,
  getLogs,
};
