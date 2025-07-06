import fs from "fs";
import path from "path";
import readline from "readline";
import chalk from "chalk";
const textArt = `
    ${chalk.cyanBright("██╗░░██╗██╗░░░██╗██████╗░██████╗░██╗░█████╗░███╗░░██╗")}
    ${chalk.cyanBright("██║░░██║╚██╗░██╔╝██╔══██╗██╔══██╗██║██╔══██╗████╗░██║")}
    ${chalk.cyanBright("███████║░╚████╔╝░██║░░██║██████╔╝██║██║░░██║██╔██╗██║")}
    ${chalk.cyanBright("██╔══██║░░╚██╔╝░░██║░░██║██╔══██╗██║██║░░██║██║╚████║")}
    ${chalk.cyanBright("██║░░██║░░░██║░░░██████╔╝██║░░██║██║╚█████╔╝██║░╚███║")}
    ${chalk.cyanBright("╚═╝░░╚═╝░░░╚═╝░░░╚═════╝░╚═╝░░╚═╝╚═╝░╚════╝░╚═╝░░╚══╝")}
    ${chalk.cyanBright("SELFBOT Configurator")}
`;
console.log(textArt);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const askInput = (question) => {
    return new Promise((resolve) => {
        rl.question(chalk.cyan(question + ": "), (answer) => {
            resolve(answer.trim());
        });
    });
};
async function configure() {
    const config = {
        token: await askInput("Enter your bot token"),
        prefix: await askInput("Enter your command prefix"),
        safetyTime: await askInput("Enter the safety(Auto-Delete) time in seconds"),
    };
    const configPath = path.join(__dirname, "../../config.json");
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");
    console.log(chalk.green("Configuration saved successfully!"));
    rl.close();
}
configure();
