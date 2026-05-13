import fs from "fs"
import path from "path"
import { getConfig } from "../utils/config-read.ts"

let config: any;
config = getConfig();

const autoReactState: any = {
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
