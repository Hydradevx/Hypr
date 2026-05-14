import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { ipcRenderer } from 'electron'
import { get } from 'http'
import { getServers } from 'dns'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld("hypr", {

  getConfig: () =>
    ipcRenderer.invoke("config:get"),

  saveConfig: (config: any) =>
    ipcRenderer.invoke("config:set", config),

  getBotStats: () =>
    ipcRenderer.invoke("bot:stats"),

  getLogs: () =>
    ipcRenderer.invoke("bot:logs"),

  killBot: () =>
    ipcRenderer.invoke("bot:kill"),

  getRPC: () =>
    ipcRenderer.invoke("rpc:get"),

  setRPC: (data: any) =>
    ipcRenderer.invoke("rpc:set", data),

  getServers: () =>
    ipcRenderer.invoke("getServers"),

  sendCommand: (data: any) =>
    ipcRenderer.invoke(
      "sendCommand",
      data,
    ),
});
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
