import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { memberHandlers } from './backend/ipc/memberHandlers.js';
import connectToDatabase from './backend/mongo.js';
import dotenv from 'dotenv';

dotenv.config();


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
      nodeIntegration: false
    }
  });

    const indexPath = path.join(__dirname, 'gym-app', 'dist', 'index.html');
    console.log('Loading index from:', indexPath);
    mainWindow.loadFile(indexPath);
}

app.whenReady().then(async () => {
  await connectToDatabase();
  memberHandlers();
  createMainWindow();
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});