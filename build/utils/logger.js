import * as colors from "ansi-colors";
let logs = [];
const maxLogs = process.stdout.rows - 10;
const Json = require("../../package.json");
const log = (message) => {
  logs.push(message);
  console.log(message);
  renderLogs();
};
function displayTextArt() {
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
function renderLogs() {
  displayTextArt();
  console.log(colors.green("\nLogs:\n"));
  const logsToShow = logs.slice(-maxLogs);
  logsToShow.forEach((logText) => {
    console.log(logText);
  });
}
function initLogger() {
  log(colors.green("Logger initialized."));
}
function status(message) {
  log(colors.cyan(`[STATUS] ${message}`));
}
function warn(message) {
  log(colors.red(`[WARN] ${message}`));
}
function info(message) {
  log(colors.blue(`[INFO] ${message}`));
}
function error(message) {
  log(colors.red(`[ERROR] ${message}`));
}
function cmd(message) {
  log(colors.cyan(`[COMMAND] ${message}`));
}
function wlog(message) {
  log(colors.white(`[LOG] ${message}`));
}
export default {
  status,
  error,
  warn,
  info,
  cmd,
  initLogger,
  wlog,
};
