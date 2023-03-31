const { app, BrowserWindow, Tray, nativeImage, Menu, ipcMain } = require('electron');
const path = require('path')
const fs = require('fs');
const { fileURLToPath } = require('url');

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
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, 'preload.js'),
        }
    })
        
    window.loadFile(path.join(__dirname, 'src', 'index.html'))

    return window
}

function createTray(icon){
    const tray = new Tray(icon)
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Open' , click: () => mainWindow.show() },
        { label: quitPhrases[getRandomInteger(0,quitPhrases.length)] , click: () => app.quit() },
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

ipcMain.on('save-data', (event, data) => {
    fs.writeFileSync(path.join(__dirname, 'src', 'data', 'save.json'), data)
    console.log('Sucess!')
})

ipcMain.on('read-data', (event) => {
    const file = fs.readFileSync(path.join(__dirname, 'src', 'data' , 'save.json'), 'utf8')
    event.sender.send('data-readed', file)
})


function getRandomInteger(min, max){ //min inclusive, max exclusive
    return Math.floor((Math.random() * (max - min)) + min)
}

ipcMain.on('close', () => mainWindow.hide())
ipcMain.on('minimize', () => mainWindow.minimize())

const quitPhrases = [
    'Donut leave meee!',
    'Donut shut it down, please!',
    'I Donut believe that you are leaving!',
    'Donut do this!',
    'Donut click this button!'
]