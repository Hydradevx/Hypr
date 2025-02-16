"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o)
            if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== "default") __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
Object.defineProperty(exports, "__esModule", { value: true });
const colors = __importStar(require("ansi-colors"));
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
exports.default = {
  status,
  error,
  warn,
  info,
  cmd,
  initLogger,
  wlog,
};
