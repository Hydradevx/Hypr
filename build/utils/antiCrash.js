"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = antiCrash;
const logger_1 = __importDefault(require("./logger"));
function antiCrash() {
  process.on("uncaughtException", (error) => {
    console.log("Uncaught Exception:", error.stack || error);
  });
  process.on("unhandledRejection", (reason, promise) => {
    console.log("Unhandled Rejection at:", promise, "Reason:", reason);
  });
  process.on("warning", (warning) => {
    if (warning.name === "DeprecationWarning") return; // Ignore deprecation warnings (node-fetch etc.)
    console.log("Warning:", warning.stack || warning);
  });
  logger_1.default.status(
    "Anti-crash module initialized. All errors will be logged.",
  );
}
