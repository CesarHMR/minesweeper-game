const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 300,
        height: 400,
        //titleBarStyle: 'hidden',
        autoHideMenuBar: true,
        resizable: false,
        transparent: true, 
        frame: false
    })
  
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if(process.plataform !== 'darwin') app.quit()
})