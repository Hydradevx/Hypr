const colors = require("ansi-colors");

let logs = [];
let maxLogs = process.stdout.rows - 10;
const Json = require("../package.json");
const log = console.log;

function displayTextArt() {
  const textArt = `
${colors.cyanBright("██╗░░██╗██╗░░░██╗██████╗░██████╗░██╗░█████╗░███╗░░██╗")}
${colors.cyanBright("██║░░██║╚██╗░██╔╝██╔══██╗██╔══██╗██║██╔══██╗████╗░██║")}
${colors.cyanBright("███████║░╚████╔╝░██║░░██║██████╔╝██║██║░░██║██╔██╗██║")}
${colors.cyanBright("██╔══██║░░╚██╔╝░░██║░░██║██╔══██╗██║██║░░██║██║╚████║")}
${colors.cyanBright("██║░░██║░░░██║░░░██████╔╝██║░░██║██║╚█████╔╝██║░╚███║")}
${colors.cyanBright(
  `╚═╝░░╚═╝░░░╚═╝░░░╚═════╝░╚═╝░░╚═╝╚═╝░╚════╝░╚═╝░░╚══╝ SELFBOT v${Json.version}`
)}
`;
  console.clear();
  log(textArt);
}
function renderLogs() {
   displayTextArt();
  log(colors.green('\nLogs:\n'));

  const logsToShow = logs.slice(-maxLogs);
  logsToShow.forEach((logText, index) => {
    log(logText);
  });
  
 // log(logs.at(logs.length - 1));
}

function wlog(message) {
  logs.push(colors.white(`[LOG]: ${message}`));
  renderLogs();
}

function warn(message) {
  logs.push(colors.red(`[WARN]: ${message}`));
  renderLogs();
}

function status(message) {
  logs.push(colors.yellow(`[STATUS]: ${message}`));
  renderLogs();
}

function success(message) {
  logs.push(colors.green(`[SUCCESS]: ${message}`));
  renderLogs();
}

function error(message) {
  logs.push(colors.green(`[ERROR]: ${message}`));
  renderLogs();
}
function info(message) {
  logs.push(colors.blue(`[INFO]: ${message}`));
  renderLogs();
}

function initLogger() {
  logs.push(colors.green("Logger initialized."));
  renderLogs();
  console.log = wlog;
  console.warn = warn;
  console.info = info;
  console.success = success;
  console.error = error;
  console.status = status;
}

module.exports = { initLogger, log: wlog, warn, status, success, info, error };
