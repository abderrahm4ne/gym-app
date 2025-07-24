const { contextBridge, ipcRenderer } = require('electron');

const allowedInvokeChannels = [
  'add-member',
  'get-members',
  'get-member',
  'update-member',
  'renew-member',
  'delete-member',
  'load-note'
];

const allowedSendChannels = ['save-note'];

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    invoke: (channel, ...args) => {
      if (allowedInvokeChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, ...args);
      } else {
        console.warn(`Blocked invoke on unauthorized channel: ${channel}`);
        return Promise.reject(new Error(`Unauthorized invoke channel: ${channel}`));
      }
    },
    send: (channel, data) => {
      if (allowedSendChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      } else {
        console.warn(`Blocked send on unauthorized channel: ${channel}`);
      }
    }
  }
});
