"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logdeviceInfo = logdeviceInfo;
const os_1 = __importDefault(require("os"));
const systeminformation_1 = __importDefault(require("systeminformation"));
const ansi_colors_1 = __importDefault(require("ansi-colors"));
async function getDeviceInfo() {
    const basicInfo = {
        platform: os_1.default.platform(),
        architecture: os_1.default.arch(),
        cpu: os_1.default.cpus()[0].model,
        cores: os_1.default.cpus().length,
        totalMemory: `${(os_1.default.totalmem() / 1024 ** 3).toFixed(2)} GB`,
        freeMemory: `${(os_1.default.freemem() / 1024 ** 3).toFixed(2)} GB`,
        hostname: os_1.default.hostname(),
        uptime: `${(os_1.default.uptime() / 60).toFixed(2)} minutes`,
    };
    const extendedInfo = await systeminformation_1.default.get({
        system: "manufacturer, model, version",
        cpu: "speed",
        osInfo: "distro, release, codename",
        graphics: "controllers",
    });
    return { basicInfo, extendedInfo };
}
function logDeviceInfo(info) {
    console.log("Basic System Information:");
    for (const [key, value] of Object.entries(info.basicInfo)) {
        console.log(`${key}: ${value}`);
    }
    console.log(ansi_colors_1.default.cyanBright("\nExtended System Information:"));
    console.log(`${ansi_colors_1.default.yellow("Manufacturer")}: ${ansi_colors_1.default.white(info.extendedInfo.system.manufacturer)}`);
    console.log(`${ansi_colors_1.default.yellow("Model")}: ${ansi_colors_1.default.white(info.extendedInfo.system.model)}`);
    console.log(`${ansi_colors_1.default.yellow("OS Distribution")}: ${ansi_colors_1.default.white(info.extendedInfo.osInfo.distro)}`);
    console.log(`${ansi_colors_1.default.yellow("OS Release")}: ${ansi_colors_1.default.white(info.extendedInfo.osInfo.release)}`);
    console.log(`${ansi_colors_1.default.yellow("CPU Speed")}: ${ansi_colors_1.default.white(info.extendedInfo.cpu.speed)} GHz`);
    console.log(`${ansi_colors_1.default.yellow("Graphics Controller")}: ${ansi_colors_1.default.white(info.extendedInfo.graphics.controllers.map((g) => g.model).join(", "))}`);
}
async function logdeviceInfo() {
    console.clear();
    const deviceInfo = await getDeviceInfo();
    logDeviceInfo(deviceInfo);
}
