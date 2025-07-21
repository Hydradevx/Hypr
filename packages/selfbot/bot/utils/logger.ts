import chalk from "chalk";
import { readFile } from "fs/promises";

const Json = JSON.parse(
  await readFile(new URL("../../../package.json", import.meta.url), "utf-8")
);

let logs: string[] = [];
const maxLogs = process.stdout.rows - 10;
const logBuffer: string[] = [];

let animationDone = false;
let queuedLogs: string[] = [];

const log = (message: string) => {
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

function stripAnsi(str: string): string {
  return str.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    ""
  );
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

function playHackerIntro(): Promise<void> {
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

function getLogs(): string[] {
  return logBuffer.slice(-100);
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