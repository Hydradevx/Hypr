import electron from 'electron';

const { contextBridge, ipcRenderer } = electron;

const electronAPI = {
  startSelfbot: () => ipcRenderer.invoke('start-selfbot'),
  stopSelfbot: () => ipcRenderer.invoke('stop-selfbot'),
  getBotStatus: () => ipcRenderer.invoke('get-bot-status'),
  onSelfbotLog: (callback: (event: any, data: string) => void) => 
    ipcRenderer.on('selfbot-log', callback),
  onSelfbotError: (callback: (event: any, data: string) => void) => 
    ipcRenderer.on('selfbot-error', callback),
  onSelfbotExited: (callback: (event: any, code: number) => void) => 
    ipcRenderer.on('selfbot-exited', callback),
  removeAllListeners: (channel: string) => 
    ipcRenderer.removeAllListeners(channel)
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);

declare global {
  interface Window {
    electronAPI: typeof electronAPI;
  }
}