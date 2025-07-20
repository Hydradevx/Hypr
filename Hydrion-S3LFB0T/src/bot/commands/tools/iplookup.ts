import axios from "axios";
import logger from "../../utils/logger.js";

export default {
  name: "iplookup",
  aliases: ["ip"],
  info: "Fetches geolocation info for an IP address",
  usage: "iplookup <ip>",
  async execute(message: any, args: any) {
    const query = args[0];
    if (!query) return message.channel.send("Please provide an IP address.");

    try {
      const res = await axios.get(`http://ip-api.com/json/${query}`);
      if (res.data.status !== "success") {
        return message.channel.send("Invalid IP or lookup failed.");
      }

      const ipInfo = `🌍 **IP Lookup:** \`${query}\`
      **Country:** ${res.data.country} (${res.data.countryCode})
      **Region:** ${res.data.regionName}
      **City:** ${res.data.city}
      **ISP:** ${res.data.isp}
      **Org:** ${res.data.org}
      **Timezone:** ${res.data.timezone}`;

      const sentMessage = await message.channel.send(ipInfo);
      setTimeout(() => sentMessage.delete().catch(() => {}), 10000);

      logger.cmd(`IP Lookup executed for: ${query}`);
    } catch (error) {
      message.channel.send("Error fetching IP details.");
    }

    message.delete();
  },
};
