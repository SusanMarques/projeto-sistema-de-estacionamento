const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let serverProcess;

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1500,
        height: 1000,
        icon: 'assets/icon/logo-smart-park.ico',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadFile('app/index.html');
}

app.whenReady().then(() => {
    // Inicia o servidor Express usando spawn
    serverProcess = spawn('node', ['server.js'], { stdio: 'inherit' });

    serverProcess.on('close', (code) => {
        console.log(`Servidor encerrado com código ${code}`);
    });

    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (serverProcess) {
        serverProcess.kill();
    }

    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('before-quit', () => {
    if (serverProcess) {
        serverProcess.kill();
    }
});
