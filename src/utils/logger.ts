import colors from "ansi-colors";

interface LogFunction {
  (message: string): void;
}

let logs: string[] = [];
const maxLogs = process.stdout.rows - 10;

const Json = require("../package.json");

const log: LogFunction = console.log;

function displayTextArt(): void {
  const textArt = `
    ${colors.cyanBright("██╗░░██╗██╗░░░██╗██████╗░██████╗░██╗░█████╗░███╗░░██╗")}
    ${colors.cyanBright("██║░░██║╚██╗░██╔╝██╔══██╗██╔══██╗██║██╔══██╗████╗░██║")}
    ${colors.cyanBright("███████║░╚████╔╝░██║░░██║██████╔╝██║██║░░██║██╔██╗██║")}
    ${colors.cyanBright("██╔══██║░░╚██╔╝░░██║░░██║██╔══██╗██║██║░░██║██║╚████║")}
    ${colors.cyanBright("██║░░██║░░░██║░░░██████╔╝██║░░██║██║╚█████╔╝██║░╚███║")}
    ${colors.cyanBright(`╚═╝░░╚═╝░░░╚═╝░░░╚═════╝░╚═╝░░╚═╝╚═╝░╚════╝░╚═╝░░╚══╝ SELFBOT v${Json.version}`)}
    `;

  console.clear();
  log(textArt);
}

function renderLogs(): void {
  displayTextArt();
  log(colors.green("\nLogs:\n"));

  const logsToShow = logs.slice(-maxLogs);

  logsToShow.forEach((logText) => {
    log(logText);
  });
}

function wlog(message: string): void {
  logs.push(colors.white(`[LOG]: ${message}`));
  renderLogs();
}

function warn(message: string): void {
  logs.push(colors.red(`[WARN]: ${message}`));
  renderLogs();
}

function logStatus(message: string): void {
  logs.push(colors.yellow(`[STATUS]: ${message}`));
  renderLogs();
}

function logSuccess(message: string): void {
  logs.push(colors.green(`[SUCCESS]: ${message}`));
  renderLogs();
}

function error(message: string): void {
  logs.push(colors.green(`[ERROR]: ${message}`));
  renderLogs();
}

function info(message: string): void {
  logs.push(colors.blue(`[INFO]: ${message}`));
  renderLogs();
}

function initLogger(): void {
  logs.push(colors.green("Logger initialized."));
  renderLogs();

  console.log = wlog;
  console.warn = warn;
  console.info = info;

  console.error = error;
}

export { initLogger, log, wlog, warn, logStatus, logSuccess, info, error };
