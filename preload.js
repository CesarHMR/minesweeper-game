const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            let whitelist = ['close', 'minimize', 'save-data', 'read-data', 'change-window-state'];
            if (whitelist.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let whitelist = ['data-readed', 'window-state-changed'];
            if (whitelist.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        },
        sendSync: (channel, data) => {
            let whitelist = ['read-data-sync'];
            if (whitelist.includes(channel)) {
                const response = ipcRenderer.sendSync(channel, data);
                return response
            }
        }
    }
);