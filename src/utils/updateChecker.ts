const axios = require("axios");
const { info, Status, Warn } = require("./logger"); // Capitalized 'Status' & 'Warn' to avoid TS conflicts.

const checkUpdate = async (Json: { version: string }) => {
  try {
    const rawFileUrl =
      "https://raw.githubusercontent.com/Hydrion-Tools/Hydrion-S3LFB0T/refs/heads/main/package.json";

    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537",
    };

    const response = await axios.get(rawFileUrl, { headers });

    if (!response.data || !response.data.version) {
      Warn("Failed to fetch latest version. Response is invalid.");
      return true;
    }

    const ghVersion = response.data.version;
    const version = Json.version;

    if (ghVersion !== version) {
      Status(`New version available: ${ghVersion}`);
      Warn(
        "Please backup your config.json and install the latest version to continue using Hydrion!! Thank you",
      );
      return false;
    } else {
      info(`You are running the latest version: ${version}`);
      return true;
    }
  } catch (error: any) {
    Warn(`Error checking for updates: ${error.message}`);
    return true;
  }
};

module.exports = { checkUpdate };
