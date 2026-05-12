const afkState: any = {
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

  setAfkStatus(status: boolean) {
    this.status = status;
  },

  setAfkReason(reason: string) {
    this.reason = reason;
  },

  setAfkStartTime(startTime: any) {
    this.startTime = startTime;
  },
};

export default afkState;
