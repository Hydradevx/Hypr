import os from "os";
import si from "systeminformation";
import chalk from "chalk";
const colors = chalk;

interface BasicInfo {
  platform: string;
  architecture: string;
  cpu: string;
  cores: number;
  totalMemory: string;
  freeMemory: string;
  hostname: string;
  uptime: string;
}

interface ExtendedInfo {
  system: {
    manufacturer: string;
    model: string;
    version: string;
  };
  cpu: {
    speed: string;
  };
  osInfo: {
    distro: string;
    release: string;
    codename: string;
  };
  graphics: {
    controllers: { model: string }[];
  };
}

async function getDeviceInfo(): Promise<{
  basicInfo: BasicInfo;
  extendedInfo: ExtendedInfo;
}> {
  const basicInfo: BasicInfo = {
    platform: os.platform(),
    architecture: os.arch(),
    cpu: os.cpus()[0].model,
    cores: os.cpus().length,
    totalMemory: `${(os.totalmem() / 1024 ** 3).toFixed(2)} GB`,
    freeMemory: `${(os.freemem() / 1024 ** 3).toFixed(2)} GB`,
    hostname: os.hostname(),
    uptime: `${(os.uptime() / 60).toFixed(2)} minutes`,
  };

  const extendedInfo: ExtendedInfo = await si.get({
    system: "manufacturer, model, version",
    cpu: "speed",
    osInfo: "distro, release, codename",
    graphics: "controllers",
  });

  return { basicInfo, extendedInfo };
}

function logDeviceInfo(info: {
  basicInfo: BasicInfo;
  extendedInfo: ExtendedInfo;
}): void {
  console.log("Basic System Information:");
  for (const [key, value] of Object.entries(info.basicInfo)) {
    console.log(`${key}: ${value}`);
  }

  console.log(colors.cyanBright("\nExtended System Information:"));
  console.log(
    `${colors.yellow("Manufacturer")}: ${colors.white(info.extendedInfo.system.manufacturer)}`,
  );
  console.log(
    `${colors.yellow("Model")}: ${colors.white(info.extendedInfo.system.model)}`,
  );
  console.log(
    `${colors.yellow("OS Distribution")}: ${colors.white(info.extendedInfo.osInfo.distro)}`,
  );
  console.log(
    `${colors.yellow("OS Release")}: ${colors.white(info.extendedInfo.osInfo.release)}`,
  );
  console.log(
    `${colors.yellow("CPU Speed")}: ${colors.white(info.extendedInfo.cpu.speed)} GHz`,
  );
  console.log(
    `${colors.yellow("Graphics Controller")}: ${colors.white(info.extendedInfo.graphics.controllers.map((g) => g.model).join(", "))}`,
  );
}

async function logdeviceInfo(): Promise<void> {
  console.clear();
  const deviceInfo = await getDeviceInfo();
  logDeviceInfo(deviceInfo);
}

export { logdeviceInfo };
