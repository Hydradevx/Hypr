import * as colors from "ansi-colors";

interface LogFunction {
  (message: string): void;
}

let logs: string[] = [];
const maxLogs = process.stdout.rows - 10;

const Json = require("../../package.json");

const log: LogFunction = (message: string) => {
  logs.push(message);
  console.log(message);
  renderLogs();
};

function displayTextArt(): void {
  const textArt = `
    ${colors.cyanBright("██╗░░██╗██╗░░░██╗██████╗░██████╗░██╗░█████╗░███╗░░██╗")}
    ${colors.cyanBright("██║░░██║╚██╗░██╔╝██╔══██╗██╔══██╗██║██╔══██╗████╗░██║")}
    ${colors.cyanBright("███████║░╚████╔╝░██║░░██║██████╔╝██║██║░░██║██╔██╗██║")}
    ${colors.cyanBright("██╔══██║░░╚██╔╝░░██║░░██║██╔══██╗██║██║░░██║██║╚████║")}
    ${colors.cyanBright("██║░░██║░░░██║░░░██████╔╝██║░░██║██║╚█████╔╝██║░╚███║")}
    ${colors.cyanBright(`╚═╝░░╚═╝░░░╚═╝░░░╚═════╝░╚═╝░░╚═╝╚═╝░╚════╝░╚═╝░░╚══╝`)}
    ${colors.cyanBright(`SELFBOT v${Json.version}`)}
    `;

  console.clear();
  console.log(textArt);
}

function renderLogs(): void {
  displayTextArt();
  console.log(colors.green("\nLogs:\n"));

  const logsToShow = logs.slice(-maxLogs);

  logsToShow.forEach((logText) => {
    console.log(logText);
  });
}

function initLogger(): void {
  log(colors.green("Logger initialized."));
}

function status(message: string) {
  log(colors.cyan(`[STATUS] ${message}`));
}

function warn(message: string) {
  log(colors.red(`[WARN] ${message}`));
}

function info(message: string) {
  log(colors.blue(`[INFO] ${message}`));
}

function error(message: string) {
  log(colors.red(`[ERROR] ${message}`));
}


function cmd(message: string) {
  log(colors.cyan(`[COMMAND] ${message}`));
}

function wlog(message: string) {
  log(colors.white(`[LOG] ${message}`));
}


export default {
  status,
  error,
  warn,
  info,
  cmd,
  initLogger,
  wlog
};
