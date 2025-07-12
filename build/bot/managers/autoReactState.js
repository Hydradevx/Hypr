import fs from "fs"
import path from "path"
let config;
const configPath = path.join(__dirname, "../config.json");
config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
const autoReactState = {
    active: true,
    enable() {
        this.active = true;
    },
    disable() {
        this.active = false;
    },
    getStatus() {
        return this.active;
    },
};
export default autoReactState;
