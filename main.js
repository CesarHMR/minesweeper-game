const { app, BrowserWindow, Tray, nativeImage, Menu, ipcMain, ipcRenderer } = require('electron');
const path = require('path')
const fs = require('fs');
const { fileURLToPath } = require('url');
const { Console, log } = require('console');

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
            devTools: false,
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
        { label: 'Open' , click: () => {
            mainWindow.show()
            mainWindow.webContents.send('window-state-changed', 'open')
        }},
        { label: quitPhrases[getRandomInteger(0,quitPhrases.length)] , click: () => app.quit() },
    ])
    tray.setContextMenu(contextMenu)
    tray.setToolTip('Open Donut Sweeper')
    tray.setTitle('Title')
    tray.on('click', () => {
        mainWindow.show()
        mainWindow.webContents.send('window-state-changed', 'open')
    })
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
    'Donut leave meee!',
    'Donut shut it down, please!',
    'I Donut believe that you are leaving!',
    'Donut do this!',
    'Donut click this button!'
]

// ---------- IPC HANDLE ---------- //

ipcMain.on('save-data', (event, data) => {
    const filepath = data[0]
    const content = data[1]
    fs.writeFileSync(path.join(__dirname, 'src', 'data', filepath), content, {flag: 'wx'})
    console.log('Sucess!')
})

ipcMain.on('read-data', (event, filename) => {
    const file = fs.readFileSync(path.join(__dirname, 'src', 'data' , filename), 'utf8')
    event.sender.send('data-readed', file)
})

ipcMain.on('read-data-sync', (event, filename) => {
    const filepath = path.join(__dirname, 'src', 'data', filename)
    if(fs.existsSync(filepath)){
        const file = fs.readFileSync(filepath, 'utf8')
        event.returnValue = file
    }
    else{
        event.returnValue = undefined
    }
})

function getRandomInteger(min, max){ //min inclusive, max exclusive
    return Math.floor((Math.random() * (max - min)) + min)
}

ipcMain.on('close', (event) => {
    mainWindow.hide()
    mainWindow.webContents.send('window-state-changed', 'closed')
})

ipcMain.on('minimize', () => mainWindow.minimize())