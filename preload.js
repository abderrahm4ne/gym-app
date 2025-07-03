const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getAllMembers: () => ipcRenderer.invoke('get-members')
});
