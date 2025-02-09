const axios = require("axios");
const { info, logStatus, warn } = require("./logger"); // Capitalized 'Statuslog to avoid TS conflicts.

const checkUpdate = (Json: { version: string }) => {
  try {
    const rawFileUrl =
      "https://raw.githubusercontent.com/Hydrion-Tools/Hydrion-S3LFB0T/refs/heads/main/package.json";

    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537",
    };

    const response = axios.get(rawFileUrl, { headers });

    if (!response.data || !response.data.version) {
      warn("Failed to fetch latest version. Response is invalid.");
      return true;
    }

    const ghVersion = response.data.version;
    const version = Json.version;

    if (ghVersion !== version) {
      logStatus(`New version available: ${ghVersion}`);
      warn(
        "Please backup your config.json and install the latest version to continue using Hydrion!! Thank you",
      );
      return false;
    } else {
      info(`You are running the latest version: ${version}`);
      return true;
    }
  } catch (error: any) {
    warn(`Error checking for updates: ${error.message}`);
    return true;
  }
};

export default checkUpdate;
