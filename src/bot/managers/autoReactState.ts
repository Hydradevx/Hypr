const autoReactState: any = {
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
