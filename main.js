import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: "electron gym",
        width: 1920,
        height: 1080,
    });

    mainWindow.webContents.openDevTools();

    const startUrl = url.format({
        pathname: path.join(__dirname, './gym-app/dist/index.html'),
        protocol: 'file:',
        slashes: true
    });

    mainWindow.loadURL('http://localhost:5173/');
}

app.whenReady().then(createMainWindow);
