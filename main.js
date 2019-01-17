//DO NOT EDIT THIS OR THE ENTIRE APP WILL BREAK!!!!!!!!!!!!!!!
// - Jordan

const { app, BrowserWindow } = require('electron')

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({ width: 1920, height: 1080 })

    // and load the index.html of the app.
    win.loadFile('index.html')
}

app.on('ready', createWindow)