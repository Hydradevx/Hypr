"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
exports.initLogger = initLogger;
exports.wlog = wlog;
exports.warn = warn;
exports.logStatus = logStatus;
exports.logSuccess = logSuccess;
exports.info = info;
exports.error = error;
const ansi_colors_1 = __importDefault(require("ansi-colors"));
let logs = [];
const maxLogs = process.stdout.rows - 10;
const Json = require("../../package.json");
const log = console.log;
exports.log = log;
function displayTextArt() {
    const textArt = `
    ${ansi_colors_1.default.cyanBright("██╗░░██╗██╗░░░██╗██████╗░██████╗░██╗░█████╗░███╗░░██╗")}
    ${ansi_colors_1.default.cyanBright("██║░░██║╚██╗░██╔╝██╔══██╗██╔══██╗██║██╔══██╗████╗░██║")}
    ${ansi_colors_1.default.cyanBright("███████║░╚████╔╝░██║░░██║██████╔╝██║██║░░██║██╔██╗██║")}
    ${ansi_colors_1.default.cyanBright("██╔══██║░░╚██╔╝░░██║░░██║██╔══██╗██║██║░░██║██║╚████║")}
    ${ansi_colors_1.default.cyanBright("██║░░██║░░░██║░░░██████╔╝██║░░██║██║╚█████╔╝██║░╚███║")}
    ${ansi_colors_1.default.cyanBright(`╚═╝░░╚═╝░░░╚═╝░░░╚═════╝░╚═╝░░╚═╝╚═╝░╚════╝░╚═╝░░╚══╝ SELFBOT v${Json.version}`)}
    `;
    console.clear();
    log(textArt);
}
function renderLogs() {
    displayTextArt();
    log(ansi_colors_1.default.green("\nLogs:\n"));
    const logsToShow = logs.slice(-maxLogs);
    logsToShow.forEach((logText) => {
        log(logText);
    });
}
function wlog(message) {
    logs.push(ansi_colors_1.default.white(`[LOG]: ${message}`));
    renderLogs();
}
function warn(message) {
    logs.push(ansi_colors_1.default.red(`[WARN]: ${message}`));
    renderLogs();
}
function logStatus(message) {
    logs.push(ansi_colors_1.default.yellow(`[STATUS]: ${message}`));
    renderLogs();
}
function logSuccess(message) {
    logs.push(ansi_colors_1.default.green(`[SUCCESS]: ${message}`));
    renderLogs();
}
function error(message) {
    logs.push(ansi_colors_1.default.green(`[ERROR]: ${message}`));
    renderLogs();
}
function info(message) {
    logs.push(ansi_colors_1.default.blue(`[INFO]: ${message}`));
    renderLogs();
}
function initLogger() {
    logs.push(ansi_colors_1.default.green("Logger initialized."));
    renderLogs();
    console.log = wlog;
    console.warn = warn;
    console.info = info;
    console.error = error;
}
