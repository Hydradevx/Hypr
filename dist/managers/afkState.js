"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const afkState = {
  status: false,
  reason: "",
  startTime: null,
  getAfkStatus() {
    return this.status;
  },
  getAfkReason() {
    return this.reason;
  },
  getAfkStartTime() {
    return this.startTime;
  },
  setAfkStatus(status) {
    this.status = status;
  },
  setAfkReason(reason) {
    this.reason = reason;
  },
  setAfkStartTime(startTime) {
    this.startTime = startTime;
  },
};
exports.default = afkState;
