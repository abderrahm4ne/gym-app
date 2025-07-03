import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import url from 'url';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import db from './gym-app/db/member.js';

db.count({}, (err, count) => {
  if (count === 0) {
    db.insert({ name: "John Doe", membership: "Premium" });
  }
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: "electron gym",
        width: 1920,
        height: 1080,
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    mainWindow.webContents.openDevTools();

    const startUrl = url.format({
        pathname: path.join(__dirname, './gym-app/dist/index.html'),
        protocol: 'file:',
        slashes: true
    });

    mainWindow.loadURL('http://localhost:5173');
}

app.whenReady().then(createMainWindow);

ipcMain.handle('get-members', async () => {
    return new Promise((resolve, reject) => {
        db.find({}, (err, docs) => {
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }
        });
    });
});
