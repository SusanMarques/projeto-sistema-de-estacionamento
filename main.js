const {app, BrowserWindow} = require('electron')

let mainWindow = null;

app.on('ready', ()=>{
    console.log('Iniciando electron');
    mainWindow = new BrowserWindow({
        width: 1500, 
        height: 1000
       

})
mainWindow.loadFile('app/index.html')
})

app.on('window-all-closed', ()=>{
    app.quit();
})