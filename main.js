const {app, BrowserWindow, Menu} = require('electron')

let mainWindow = null;

app.on('ready', ()=>{
    console.log('Iniciando electron');
    mainWindow = new BrowserWindow({
        width: 1500, 
        height: 1000
       

})
Menu.setApplicationMenu(Menu.buildFromTemplate(template));
mainWindow.loadFile('app/index.html');

})

const template = [
    {
        label: 'exibir',
        submenu: [
            {
                label: 'Aplicar zoom',
                role: 'zoomIn'
            },
            {
                label: 'Reduzir zoom',
                role: 'zoomOut'
            },
        ]
    }
]


app.on('window-all-closed', ()=>{
    app.quit();
})