"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const autoReactState = {
  active: false,
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
exports.default = autoReactState;
