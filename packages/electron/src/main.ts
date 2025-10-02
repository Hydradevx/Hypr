import electron from 'electron';
import { spawn, ChildProcess } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const { app, BrowserWindow, ipcMain } = electron;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow: any;
let selfbotProcess: ChildProcess | null = null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadURL('http://localhost:3000');
}

function startSelfbot(): void {
  const selfbotPath = path.join(__dirname, '../../selfbot/bot.js');
  
  selfbotProcess = spawn('node', [selfbotPath], {
    stdio: ['pipe', 'pipe', 'pipe'],
    cwd: path.join(__dirname, '../../selfbot')
  });

  selfbotProcess.stdout?.on('data', (data) => {
    console.log(`Selfbot: ${data}`);
    if (mainWindow) {
      mainWindow.webContents.send('selfbot-log', data.toString());
    }
  });

  selfbotProcess.stderr?.on('data', (data) => {
    console.error(`Selfbot Error: ${data}`);
    if (mainWindow) {
      mainWindow.webContents.send('selfbot-error', data.toString());
    }
  });

  selfbotProcess.on('close', (code) => {
    console.log(`Selfbot process exited with code ${code}`);
    selfbotProcess = null;
    if (mainWindow) {
      mainWindow.webContents.send('selfbot-exited', code);
    }
  });
}

ipcMain.handle('start-selfbot', (): { success: boolean } => {
  if (!selfbotProcess) {
    startSelfbot();
  }
  return { success: true };
});

ipcMain.handle('stop-selfbot', (): { success: boolean } => {
  if (selfbotProcess) {
    selfbotProcess.kill();
    selfbotProcess = null;
  }
  return { success: true };
});

ipcMain.handle('get-bot-status', (): { running: boolean; pid?: number } => {
  return { 
    running: !!selfbotProcess,
    pid: selfbotProcess?.pid 
  };
});

app.whenReady().then((): void => {
  createWindow();
});

app.on('window-all-closed', (): void => {
  if (selfbotProcess) {
    selfbotProcess.kill();
  }
  app.quit();
});