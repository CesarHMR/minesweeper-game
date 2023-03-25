const { app, BrowserWindow, Tray, nativeImage, Menu, ipcMain } = require('electron');
const path = require('path')

let mainWindow;
let tray;
const icon = nativeImage.createFromPath(path.resolve(__dirname, 'src', 'images', 'icons', 'icon_64.png'))

const createWindow = () => {
    const window = new BrowserWindow({
        width: 300,
        height: 400,
        titleBarStyle: 'hidden',
        autoHideMenuBar: true,
        resizable: false,
        transparent: true, 
        frame: false,
        webPreferences: {
            //nodeIntegration: true,
            //contextIsolation: false,
            preload: path.join(__dirname, 'preload.js'),
        }
    })
    
    ipcMain.handle('close', () => window.hide())
    ipcMain.handle('minimize', () => window.minimize())
    
    window.loadFile(path.join(__dirname, 'src', 'index.html'))

    return window
}

function createTray(icon){
    const tray = new Tray(icon)
    const contextMenu = Menu.buildFromTemplate([
        { label: quitPhrases[getRandomNumber(0,quitPhrases.length)] , click: () => app.quit() },
    ])
    tray.setContextMenu(contextMenu)
    tray.setToolTip('Open Donut Sweeper')
    tray.setTitle('Title')
    tray.on('click', () => mainWindow.show())
    return tray
}

app.whenReady().then(() => {
    mainWindow = createWindow()
    tray = createTray(icon)


    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if(process.plataform !== 'darwin') app.quit()
})

app.on('before-quit', () => {
    tray.destroy()
})

const quitPhrases = [
    'Donut leave!!!',
    'Donut shut it down, please!',
    'I Donut believe that you leaving!',
    'Dunot do this!',
    'Dunot click this button!'
]

function getRandomNumber(min, max){
    return Math.round((Math.random() * max) + min)
}