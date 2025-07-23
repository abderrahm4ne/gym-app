const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    send: (channel, data) => ipcRenderer.send(channel, data),
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args)
  }
});
