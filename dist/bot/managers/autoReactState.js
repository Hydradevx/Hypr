import { getConfig } from "../utils/config-read.js";
let config;
config = getConfig();
const autoReactState = {
    active: config.autoReactState?.autoreact ?? false,
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
