const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  startVPN: (config) => ipcRenderer.invoke('start-vpn', config),
  stopVPN: () => ipcRenderer.invoke('stop-vpn'),
  getVPNStatus: () => ipcRenderer.invoke('get-vpn-status'),
  onVPNStatusChange: (callback) => ipcRenderer.on('vpn-status-change', (event, data) => callback(data))
});