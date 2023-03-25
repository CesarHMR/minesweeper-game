const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('titleBar', {
    closeApplication: () => ipcRenderer.invoke('close'),
    minimizeApplication: () => ipcRenderer.invoke('minimize'),
})