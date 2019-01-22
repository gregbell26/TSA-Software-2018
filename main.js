//DO NOT EDIT THIS OR THE ENTIRE APP WILL BREAK!!!!!!!!!!!!!!!
// - Jordan

const { app, BrowserWindow } = require('electron')
let win

function createWindow () {
    win = new BrowserWindow({ width: 1920, height: 1080 })
    win.loadFile('index.html')
    win.webContents.openDevTools()

    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})