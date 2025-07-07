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

  setRaidActive(state: boolean) {
    this.active = state;
  },

  setRaidEnabled(state: boolean) {
    this.enabled = state;
  },

  setRaidInterval(interval: any) {
    this.interval = interval;
  },

  clearRaidInterval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  },
};

export default raidState;
