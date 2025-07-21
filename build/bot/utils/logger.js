import chalk from "chalk";
import { readFile } from "fs/promises";
const Json = JSON.parse(await readFile(new URL("../../../package.json", import.meta.url), "utf-8"));
let logs = [];
const maxLogs = process.stdout.rows - 10;
const logBuffer = [];
let animationDone = false;
let queuedLogs = [];
const log = (message) => {
    const plain = stripAnsi(message);
    if (!animationDone) {
        queuedLogs.push(message);
        logBuffer.push(plain);
        return;
    }
    logs.push(message);
    logBuffer.push(plain);
    console.log(message);
    renderLogs();
};
function stripAnsi(str) {
    return str.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "");
}
function renderLogs() {
    console.clear();
    displayTextArt();
    console.log(chalk.green("\nLogs:\n"));
    const logsToShow = logs.slice(-maxLogs);
    logsToShow.forEach((line) => console.log(line));
}
function displayTextArt() {
    const art = `
${chalk.cyanBright("██╗░░██╗██╗░░░██╗██████╗░██████╗░")}
${chalk.cyanBright("██║░░██║╚██╗░██╔╝██╔══██╗██╔══██╗")}
${chalk.cyanBright("███████║░╚████╔╝░██████╔╝██████╔╝")}
${chalk.cyanBright("██╔══██║░░╚██╔╝░░██╔═══╝░██╔══██╗")}
${chalk.cyanBright("██║░░██║░░░██║░░░██║░░░░░██║░░██║")}
${chalk.cyanBright("╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░░░░╚═╝░░╚═╝")}
${chalk.cyanBright(`SELFBOT v${Json.version}`)}
`;
    console.log(art);
}
function playHackerIntro() {
    return new Promise((resolve) => {
        console.clear();
        const frames = [
            chalk.greenBright("Initializing..."),
            chalk.green("Bypassing firewall..."),
            chalk.yellow("Loading modules..."),
            chalk.magenta("Authenticating user..."),
            chalk.cyan("Establishing command link..."),
            chalk.whiteBright("Injecting logger..."),
            chalk.cyanBright("Done."),
        ];
        let i = 0;
        const interval = setInterval(() => {
            console.log(frames[i]);
            i++;
            if (i === frames.length) {
                clearInterval(interval);
                setTimeout(resolve, 500); // wait a bit more before clearing screen
            }
        }, 250);
    });
}
async function initLogger() {
    await playHackerIntro();
    animationDone = true;
    console.clear();
    logs = [...queuedLogs]; // flush queued logs
    renderLogs();
    log(chalk.green("Logger initialized."));
}
function getLogs() {
    return logBuffer.slice(-100);
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
