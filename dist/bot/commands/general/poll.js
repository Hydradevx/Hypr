import logger from "../../utils/logger.js";
export default {
    name: "poll",
    aliases: ["survey"],
    info: "conducts a poll request",
    usage: "poll [question] <optional: --old>",
    async execute(message, args) {
        message.delete;
        if (!args.length)
            return message.channel.send("❌ Please provide a question for the poll.");
        const last = args.pop();
        if (last == "--old") {
            const question = args.join(" ");
            if (!question)
                return message.channel.send("❌ Please provide a question for the poll.");
            try {
                const pollMessage = await message.channel.send(`📊 **Poll:** ${question}\nReact with 👍 for yes or 👎 for no!`);
                await pollMessage.react("👍");
                await pollMessage.react("👎");
            }
            catch (error) {
                logger.error(`Error creating poll: ${error.message}`);
                message.channel.send("❌ There was an error creating the poll.");
            }
        }
        else {
            const question = args.join(" ") + " " + last;
            try {
                await message.channel.send({
                    poll: {
                        question: {
                            text: `${question}`,
                        },
                        answers: [
                            { text: "Yes", emoji: "👍" },
                            { text: "No", emoji: "👎" },
                        ],
                        duration: 8,
                        allowMultiselect: false,
                    },
                });
            }
            catch (error) {
                logger.error(`Error creating poll: ${error.message}`);
                message.channel.send("❌ There was an error creating the poll.");
            }
        }
    },
};
