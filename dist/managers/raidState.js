"use strict";
const raidState = {
  active: false,
  interval: null,
  getRaidActive() {
    return this.active;
  },
  getRaidInterval() {
    return this.interval;
  },
  setRaidActive(state) {
    this.active = state;
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
module.exports = raidState;
