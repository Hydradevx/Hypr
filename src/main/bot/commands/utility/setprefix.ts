// import logger from "../../utils/logger.ts";
// import fs from "fs";
// import path from "path";

// const configPath = path.resolve("config.json");

// export default {
//   name: "setprefix",
//   aliases: ["changeprefix"],
//   info: "changes the prefix for the bot",
//   usage: "setprefix [new prefix]",

//   async execute(message: any, args: any) {
//     if (args.length === 0) {
//       message.channel.send("Please provide a new prefix.");
//       return;
//     }

//     const newPrefix = args[0];

//     try {
//       const config = JSON.parse(
//         fs.readFileSync(configPath, "utf-8")
//       );

//       config.prefix = newPrefix;

//       fs.writeFileSync(
//         configPath,
//         JSON.stringify(config, null, 2)
//       );

//       logger.cmd(`Prefix updated to: ${newPrefix}`);

//       message.channel.send(
//         `Prefix has been updated to: \`${newPrefix}\``
//       );
//     } catch (err) {
//       logger.error(`Error updating prefix: ${err}`);

//       message.channel.send(
//         "An error occurred while updating the prefix."
//       );
//     }

//     message.delete().catch(() => {});
//   },
// };