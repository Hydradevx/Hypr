import logger from "./logger.js";
export function antiCrash() {
    process.on("uncaughtException", (error) => {
        console.log("Uncaught Exception:", error.stack || error);
    });
    process.on("unhandledRejection", (reason, promise) => {
        console.log("Unhandled Rejection at:", promise, "Reason:", reason);
    });
    process.on("warning", (warning) => {
        if (warning.name === "DeprecationWarning")
            return; // Ignore deprecation warnings (node-fetch etc.)
        console.log("Warning:", warning.stack || warning);
    });
    logger.status("Anti-crash module initialized. All errors will be logged.");
}
