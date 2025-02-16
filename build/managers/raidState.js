"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raidState = {
  active: false,
  interval: null,
  enabled: false,
  getRaidActive() {
    return this.active;
  },
  getRaidEnabled() {
    return this.enabled;
  },
  getRaidInterval() {
    return this.interval;
  },
  setRaidActive(state) {
    this.active = state;
  },
  setRaidEnabled(state) {
    this.enabled = state;
  },
  setRaidInterval(interval) {
    this.interval = interval;
  },
  clearRaidInterval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  },
};
exports.default = raidState;
