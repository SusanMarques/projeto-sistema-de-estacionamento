const { app, BrowserWindow } = require('electron');
const path = require('path');
const { exec } = require('child_process');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1500,
        height: 1000,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadFile('app/index.html');
}

app.whenReady().then(() => {
    // Inicia o servidor Express
    const server = exec('node server.js');
    server.stdout.on('data', (data) => console.log(`Servidor: ${data}`));
    server.stderr.on('data', (data) => console.error(`Erro do Servidor: ${data}`));

    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
