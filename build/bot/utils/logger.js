import chalk from "chalk";
import { readFile } from "fs/promises";
const Json = JSON.parse(await readFile(new URL("../../../package.json", import.meta.url), "utf-8"));
let logs = [];
const maxLogs = process.stdout.rows - 10;
const logBuffer = [];
const log = (message) => {
    logs.push(message);
    logBuffer.push(stripAnsi(message));
    console.log(message);
    renderLogs();
};
function stripAnsi(str) {
    return str.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "");
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
function getLogs() {
    return logBuffer.slice(-100);
}
function initLogger() {
    log(chalk.green("Logger initialized."));
}
export default {
    status: (msg) => log(chalk.cyan(`[STATUS] ${msg}`)),
    error: (msg) => log(chalk.red(`[ERROR] ${msg}`)),
    warn: (msg) => log(chalk.yellow(`[WARN] ${msg}`)),
    info: (msg) => log(chalk.blue(`[INFO] ${msg}`)),
    cmd: (msg) => log(chalk.magenta(`[COMMAND] ${msg}`)),
    wlog: (msg) => log(chalk.white(`[LOG] ${msg}`)),
    initLogger,
    getLogs,
};
